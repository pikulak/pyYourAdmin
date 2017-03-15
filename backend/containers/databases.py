from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.engine import url


class DatabaseSessionsContainer:
    databases = {}

    @classmethod
    def get(cls, db_id):
        if db_id in cls.databases:
            return cls.databases[db_id]
        else:
            return False


    @classmethod
    def add(cls, db_id, **db_props):
        if not db_id in cls.databases:
            db_props["drivername"] = "postgresql+psycopg2"
            engine = create_engine(url.URL(**db_props),
                                   convert_unicode=True,
                                   encoding="utf8")

            session = sessionmaker(autocommit=False,
                                   autoflush=False,
                                   bind=engine)()

            cls.databases[db_id] = session
            return True
        else:
            return False


