from flask import jsonify, session
from flask.views import MethodView
from flask_login import login_required

class TableEndpoint(MethodView):
    decorators = [login_required]

    def get(self, table_name):
        if table_name is None:
            #return a list of tables
            pass
        else:
            #expose a single table
            pass

    def post(self):
        # create a new table
        pass

    def delete(self, table_name):
        # delete a single table
        pass

    def put(self, table_name):
        # update a single table
        pass
