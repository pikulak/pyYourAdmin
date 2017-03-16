from flask import jsonify, session
from flask.views import MethodView
from flask_login import login_required

from containers.databases import DatabaseEnginesContainer


class DatabaseEndpoint(MethodView):
    decorators = [login_required]

    def get(self):
        db_id = session["db_id"]
        engine = DatabaseEnginesContainer.get(db_id)
        db_props = engine.engine.url
        db_props = db_props.translate_connect_args()
        del db_props["password"]
        return jsonify(**db_props)
