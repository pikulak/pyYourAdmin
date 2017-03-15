from flask.views import MethodView


class DatabasesAPI(MethodView):

    def get(self):
