from flask import jsonify, session
from flask.views import MethodView
from flask_login import login_required
from containers.databases import DatabaseEnginesContainer
from sqlalchemy.sql import select, table, column
from utils.db_utils import parse_table_result

class TableEndpoint(MethodView):
    decorators = [login_required]

    def get(self, table_name):
        if table_name is None:
            db_id = session['db_id']
            engine = DatabaseEnginesContainer.get(db_id)
            tables = engine.table_names()
            return jsonify(*tables)
        else:
            db_id = session['db_id']
            engine = DatabaseEnginesContainer.get(db_id)
            table_expression = table(table_name)
            stmt = select(['*', table_expression], bind=engine)
            result = engine.execute(stmt)
            return jsonify(**parse_table_result(result))

    def post(self):
        # create a new table
        pass

    def delete(self, table_name):
        # delete a single table
        pass

    def put(self, table_name):
        # update a single table
        pass
