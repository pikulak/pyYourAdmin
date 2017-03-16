from flask import Blueprint, render_template, jsonify, make_response, request
from flask_login import login_required, login_user, logout_user, current_user
from containers.databases import DatabaseEnginesContainer
from utils.db_utils import create_db_engine, check_db_connection
from utils.api_utils import validate_required_conn_fields

from login_manager import TemporaryDatabaseUser

dbms_api = Blueprint("dbms_api", __name__, template_folder="../frontend/templates/")

@dbms_api.route("/")
def main():
    return render_template("main.html")


@dbms_api.route("/api/database/connect/", methods=["POST"])
def connect():
    db_props = request.get_json()
    response = {
        "status": "failed",
        "message": "Unexpected error"
    }
    engine = create_db_engine(**db_props)

    if not check_db_connection(engine):
        response["message"] = "Can't connect to specifed database"
        return make_response(jsonify(**response), 401)

    if not validate_required_conn_fields(db_props):
        response["message"] = "Invalid arguments"
        return make_response(jsonify(**response), 401)

    try:
        db_user = TemporaryDatabaseUser("jakies_id")
        login_user(db_user)
        DatabaseEnginesContainer.add("jakies_id", engine)
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



@dbms_api.route("/api/database/name/", methods=["GET"])
@login_required
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



