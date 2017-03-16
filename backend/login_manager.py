from flask_login import LoginManager, UserMixin
from containers.databases import DatabaseEnginesContainer

login_manager = LoginManager()

class TemporaryDatabaseUser(UserMixin):
    def __init__(self, db_id):
        self._id = db_id

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

    @staticmethod
    def get(id):
        return DatabaseEnginesContainer.get(id)

@login_manager.user_loader
def load_database_session(id):
    database_user_entry = TemporaryDatabaseUser.get(id)
    if database_user_entry:
        return TemporaryDatabaseUser(id)
    else:
        return None
