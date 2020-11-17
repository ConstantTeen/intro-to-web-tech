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

        usr_state = self.get_cookie("usr-state")

        if not (usr_state == 'knows-about-cookie'):
            with open("{}/cookie_warning.html".format(os.getcwd()), 'rb') as f:
                        data = f.read()
                        self.write(data)
        self.finish()

class ManifestHandler(tornado.web.RequestHandler):
    def get(self):
        with open("{}/manifest.json".format(os.getcwd()), 'rb') as f:
            data = f.read()
            self.write(data)


application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/manifest.json", ManifestHandler)
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()