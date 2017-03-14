from flask import Flask
from login_manager import login_manager
from api import dbms_api


app = Flask(__name__, static_folder="../frontend/static/", static_url_path="/static")
app.register_blueprint(dbms_api)
app.secret_key = "some_secret"
app.config["DEBUG"] = True
login_manager.init_app(app)

app.run(host='0.0.0.0', port=80)
