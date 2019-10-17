from flask import Flask, g, render_template, jsonify
import sqlite3
import os

DATABASE = "./static/data/pending.sqlite"

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'

# helper method to get the database since calls are per thread,
# and everything function is a new thread when called
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


# helper to close
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def json_data():
    cur = get_db().cursor()
    fos = cur.execute("select * from pending limit 1500").fetchall()
    return jsonify(fos)

if __name__ == "__main__":
    """
	Use python sqlite3 to create a local database, insert some basic data and then
	display the data using the flask templating.
	
	http://flask.pocoo.org/docs/0.12/patterns/sqlite3/
    """
    app.run()