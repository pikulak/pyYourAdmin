
def validate_required_conn_fields(data):
    required_fields = ["host", "database", "port", "username", "password"]
    for required_field in required_fields:
        if required_field not in data:
            return False
    return True
