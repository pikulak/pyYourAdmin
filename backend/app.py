from flask import Flask, render_template, jsonify, make_response, request
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user

import json

app = Flask(__name__, template_folder="../frontend/templates/", static_folder="../frontend/static/",
            static_url_path="/static")
app.secret_key = "some_secret"
app.config["DEBUG"] = True
login_manager = LoginManager()
login_manager.init_app(app)



class Database(UserMixin):
    databases = {"testdb": {
        "host": "host",
        "port": "5423",
        "database": "testdb",
        "username": "username",
        "password": "password" }}

    def __init__(self, **kwargs):
        self._id = kwargs["database"]
        self._host = kwargs["host"]
        self._port = kwargs["port"]
        self._database = kwargs["database"]
        self._username = kwargs["username"]
        self._password = kwargs["password"]

    @property
    def id(self):
        return self._id

    @property
    def host(self):
        return self._host

    @property
    def port(self):
        return self._port

    @property
    def database(self):
        return self._database

    @property
    def username(self):
        return self._username

    @property
    def password(self):
        return self._password

    @classmethod
    def get(cls, id):
        try:
            return cls.databases[id]
        except KeyError:
            return None

    def validate(self):
        database = self.get(self._id)
        if database is None:
            return False
        elif database["password"] == self._password:
            return True
        else:
            return False


@login_manager.user_loader
def load_database(id):
    database_entry = Database.get(id)
    if database_entry is not None:
        database = Database(**database_entry)
        return database
    return None


@app.route("/")
def main():
    return render_template("main.html")


@app.route("/api/database/connect/", methods=["POST"])
def connect():
    database_props = request.get_json()
    response = {
        "status": "failed"
    }
    print(database_props)
    try:
        database = Database(**database_props)

        if database.validate():
            login_user(database)
            response["status"] = "success"
            return jsonify(**response)
    except KeyError:
        pass
    return make_response(jsonify(**response), 401)


@app.route("/api/database/disconnect", methods=["GET", "POST"])
@login_required
def disconnect():
    logout_user()
    response = {
        "status": "success"
    }
    return jsonify(**response)


@login_required
@app.route("/api/database/name/", methods=["GET"])
def get_database_name():
    response = {
        "database": current_user.database
    }
    return jsonify(**response)


@app.route("/api/database/is_connected/", methods=["GET"])
def is_connected():
    is_connected_ = False
    if current_user.is_authenticated:
        is_connected_ = True
    response = {
        "is_connected": is_connected_
    }
    print(is_connected_)
    return jsonify(**response)


app.run(host='0.0.0.0', port=80)
