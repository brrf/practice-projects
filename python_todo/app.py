from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
import sys


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://moshepraver@localhost:5432/todoapp'
db = SQLAlchemy(app)

class Todo(db.Model):
	__tablename__ = 'todos'
	id = db.Column(db.Integer, primary_key=True)
	description = db.Column(db.String(), nullable=False)

	def __repr__(self):
		return f'<Todo {self.id} {self.description}'

db.create_all()

@app.route('/todos/create', methods=['post'])
def create_todo():
	error = False
	returnObject = {}
	try: 
		description = request.get_json()['description']
		todo = Todo(description2=description)
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

