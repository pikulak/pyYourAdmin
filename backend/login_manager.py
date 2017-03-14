from flask_login import LoginManager, UserMixin

login_manager = LoginManager()

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
