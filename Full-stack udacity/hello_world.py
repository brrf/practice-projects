from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://moshepraver@localhost:5432/example2'
db = SQLAlchemy(app)

class Person(db.Model):
	__tablename__ = 'persons'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)

db.create_all()

@app.route('/')
def index():
	person = Person.query.first()
	return 'Hello there, ' + person.name
