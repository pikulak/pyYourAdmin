
class DatabaseEnginesContainer:
    databases = {}

    @classmethod
    def get(cls, db_id):
        if db_id in cls.databases:
            return cls.databases[db_id]
        else:
            return False

    @classmethod
    def add(cls, db_id, engine):
        if not db_id in cls.databases:
            cls.databases[db_id] = engine
            return True
        else:
            return False

    @classmethod
    def delete(cls, db_id):
        if db_id in cls.databases:
            del cls.databases[db_id]


