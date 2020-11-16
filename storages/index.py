import tornado.ioloop
import tornado.web
import os
import json

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        if not self.get_cookie("style-background"):
            self.set_cookie("style-background", "#f3b7b8")

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
