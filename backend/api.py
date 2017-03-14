from flask import Blueprint, render_template, jsonify, make_response, request
from flask_login import login_required, login_user, logout_user, current_user
from login_manager import Database

dbms_api = Blueprint("dbms_api", __name__, template_folder="../frontend/templates/")

@dbms_api.route("/")
def main():
    return render_template("main.html")


@dbms_api.route("/api/database/connect/", methods=["POST"])
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


@dbms_api.route("/api/database/disconnect", methods=["GET", "POST"])
@login_required
def disconnect():
    logout_user()
    response = {
        "status": "success"
    }
    return jsonify(**response)


@login_required
@dbms_api.route("/api/database/name/", methods=["GET"])
def get_database_name():
    response = {
        "database": current_user.database
    }
    return jsonify(**response)


@dbms_api.route("/api/database/is_connected/", methods=["GET"])
def is_connected():
    is_connected_ = False
    if current_user.is_authenticated:
        is_connected_ = True
    response = {
        "is_connected": is_connected_
    }
    print(is_connected_)
    return jsonify(**response)



