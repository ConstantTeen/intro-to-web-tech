import tornado.web
import tornado.ioloop
import tornado.websocket
import json
from random import choice

class WSHandler(tornado.websocket.WebSocketHandler):
    def __init__(self, *args, **kwargs):
        # 0: пустая ячейка
        # 1: крестик (пользователь)
        # -1: нолик (сервер)
        self.desk = [[0,0,0], [0,0,0],[0,0,0]]
        super().__init__(*args, **kwargs)

    def open(self):
        print("WebSocket opened")
        self.create_message(self.desk)

    def on_message(self, message):
        (x,y) = self.parse_message(message)

        if self.set_cell(x,y):
            if not self.is_it_end():
                if self.make_move():
                    if not self.is_it_end():
                        self.create_message(self.desk)
                        return

                    self.create_message(self.desk, type='losing')
                    return
                else:
                    self.create_message(self.desk, type='draw')

            self.create_message(self.desk, type='win')
            return

        self.create_message('wrong data', type='repeat')


    def make_move(self):
        """Сервер делает свой ход"""
        arr = self.desk
        possible_coords = []

        for i in range(3):
            for j in range(3):
                if arr[i][j] == 0:
                    possible_coords+= [(i,j)]

        if len(possible_coords) == 0:
            return False
        x,y = choice(possible_coords)
        self.desk[x][y] = -1

        return True

    def set_cell(self,x,y):
        """Если клетка не занята, помечает ее крестиком(метка пользователя)"""
        if self.desk[y][x] != 0:
            message = self.create_message('wrong data', type='repeat')
            return False

        self.desk[y][x] = 1
        return True

    def create_message(self, message, type='array'):
        """
        Отправляет по сокету текущее состояние доски. При этом:
            type = array: сервер сделал очередной ход
            type = win: игрок выиграл
            type = losing: игрок проиграл
            type = draw: ничья
            type = repeat: игрок выбрал ячейку, которая уже занята. просим его переходить
        """
        m = {"message": message, "type": type}
        self.write_message(json.dumps(m))


    def parse_message(self, message):
        """
        Превращает введенные пользователем символы в пару чисел,
        каждое из которых равно 0,1 или 2.
        """
        coords = tuple(map(int, json.loads(message)))

        x,y = tuple(map(lambda a: a % 3, coords))

        return x,y

    def is_it_end(self):
        """Проверяет собрал ли кто-то из игроков 3 символа в ряд/столбец/диагональ"""
        arr = self.desk

        for i in range(3):
            row = arr[i]
            if abs(row[0] + row[1] + row[2]) == 3:
                return True

            column = (arr[0][i], arr[1][i], arr[2][i])
            if abs(column[0] + column[1] + column[2]) == 3:
                return True

        if abs(arr[0][0] + arr[1][1] + arr[2][2]) == 3:
            return True

        if abs(arr[2][0] + arr[1][1] + arr[0][2]) == 3:
            return True

        return False

    def on_close(self):
        print("WebSocket closed")

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('client.html')

application = tornado.web.Application([
    (r'/', MainHandler),
    (r'/ws', WSHandler)
])

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8080)
    tornado.ioloop.IOLoop.instance().start()