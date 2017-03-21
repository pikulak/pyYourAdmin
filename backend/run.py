import decimal
from flask import Flask, json
from login_manager import login_manager
from api import dbms_api

from views.database import DatabaseEndpoint
from views.table import TableEndpoint


app = Flask(__name__, static_folder="../frontend/static/", static_url_path="/static")
app.register_blueprint(dbms_api)


db_view = DatabaseEndpoint.as_view('database_endpoint')
table_view = TableEndpoint.as_view('table_endpoint')

app.add_url_rule('/api/database/',
                 view_func=db_view)

app.add_url_rule('/api/tables/',
                 defaults={"table_name": None},
                 view_func=table_view,
                 methods=['GET',])

app.add_url_rule('/api/tables/',
                 view_func=table_view,
                 methods=['POST',])

app.add_url_rule('/api/tables/<string:table_name>',
                 view_func=table_view,
                 methods=['GET', 'PUT', 'DELETE'])



class MyJSONEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            # Convert decimal instances to strings.
            return str(obj)
        return super(MyJSONEncoder, self).default(obj)

app.json_encoder = MyJSONEncoder

app.config["DEBUG"] = True
login_manager.init_app(app)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

app.run(host='0.0.0.0', port=80)
