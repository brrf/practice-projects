from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import sys


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://moshepraver@localhost:5432/todoapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

migrate = Migrate(app, db)

class Todo(db.Model):
	__tablename__ = 'todos'
	id = db.Column(db.Integer, primary_key=True)
	description = db.Column(db.String(), nullable=False)
	completed = db.Column(db.Boolean, nullable=False, default=False)

	def __repr__(self):
		return f'<Todo {self.id} {self.description}'

@app.route('/todos/create', methods=['post'])
def create_todo():
	error = False
	returnObject = {}
	try: 
		description = request.get_json()['description']
		todo = Todo(description=description)
		db.session.add(todo)
		db.session.commit()
		returnObject['description'] = todo.description
	except: 
		error = True
		db.session.rollback()
		print(sys.exc_info())
	finally:
		db.session.close()
	if error:
		return abort(400)
	else:
		return returnObject
@app.route('/')
def index():
	return render_template('index.html', data=Todo.query.all())

