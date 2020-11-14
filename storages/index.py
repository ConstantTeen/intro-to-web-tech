import tornado.ioloop
import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):

        if not self.get_cookie("user-name"):
                self.write("<h2 id='greeting-message'>It seems like you didn't signed yet.</h2>")
        else:
            self.write("<h2 id='greeting-message'>Good to see you again, " + self.get_cookie("user-name") + "</h2>")

        with open("{}/index.html".format(os.getcwd()), 'rb') as f:
            data = f.read()
            self.write(data)

        self.finish()

application = tornado.web.Application([
    (r"/", MainHandler)
])

if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()