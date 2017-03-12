from flask import Flask, render_template, jsonify, make_response, request

app = Flask(__name__, template_folder="../frontend/templates/", static_folder="../frontend/static/", static_url_path="/static")
app.secret_key = "some_secret"
app.config["DEBUG"] = True


@app.route("/")
def main():
	return render_template("main.html")

@app.route("/api/databases/", methods=["GET"])
def get_databases():
    response = {
        "database": "dupadupa"
    }
    return jsonify(**response)

@app.route("/api/user/is_authenticated/", methods=["GET"])
def is_authenticated():
    response = {
        "is_authenticated" : False
    }
    return jsonify(**response)

app.run(host='0.0.0.0', port=80)
