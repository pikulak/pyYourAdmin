from sqlalchemy import create_engine
from sqlalchemy.engine import url
from sqlalchemy.exc import OperationalError

def create_db_engine(**db_props):
    db_props["drivername"] = "postgresql+psycopg2"
    engine = create_engine(url.URL(**db_props),
                        convert_unicode=True,
                        encoding="utf8",
                        connect_args={'connect_timeout':1})
    return engine

def check_db_connection(engine):
    try:
        connection = engine.connect()
        connection.close()
        return True
    except OperationalError:
        return False

def get_db_name(engine):
    return engine.engine.url.database

def parse_table_result(result):
    jsonifed_result = []
    column_names = result.keys()
    for row in result.fetchall():
        prepare = {}
        for index, column in enumerate(column_names):
            prepare[column] = row[index]
        jsonifed_result.append(prepare)
    return jsonifed_result
