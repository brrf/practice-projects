from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import sys


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://moshepraver@localhost:5432/todoapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

migrate = Migrate(app, db)

class Todo(db.Model):
	__tablename__ = 'todos'
	id = db.Column(db.Integer, primary_key=True)
	description = db.Column(db.String(), nullable=False)
	completed = db.Column(db.Boolean, nullable=False, default=False)
	list_id = db.Column(db.Integer, db.ForeignKey('todolists.id'), nullable=False)

	def __repr__(self):
		return f'<Todo {self.id} {self.description}'

class TodoList(db.Model):
	__tablename__ = 'todolists'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	todos = db.relationship('Todo', backref='list', lazy=True)
	completed = db.Column(db.Boolean, nullable=True, default=False)

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

@app.route('/todos/create', methods=['post'])
def create_todo():
	error = False
	returnObject = {}
	try: 
		description = request.get_json()['description']
		list_id = request.get_json()['list_id']
		todo = Todo(description=description, list_id=list_id)
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

@app.route('/lists/create', methods=['post'])
def create_list():
	error = False
	returnObject = {}
	try:
		name = request.get_json()['name']
		list = TodoList(name=name)
		db.session.add(list)
		db.session.commit()
		returnObject['name'] = list.name
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

@app.route('/todos/<todo_id>/togglecompletedtodo', methods=['post'])
def toggle_completed_todo(todo_id):
	try:
		completed = request.get_json()['completed']
		todo = Todo.query.get(todo_id)
		todo.completed = completed
		db.session.commit()
	except:
		db.session.rollback()
	finally:
		db.session.close()
	return redirect(url_for('index'))

@app.route('/lists/<list_id>/togglecompletedlist', methods=['post'])
def toggle_completed_list(list_id):
	try:
		completed = request.get_json()['completed']
		list = TodoList.query.get(list_id)

		for todo in list.todos:
			todo.completed = completed
		list.completed = completed
		db.session.commit()
	except:
		db.session.rollback()
	finally:
		db.session.close()
	return redirect(url_for('index'))

@app.route('/todos/<todo_id>/deletetodo', methods=['DELETE'])
def delete_todo(todo_id):
	error = False
	try:
		todo = Todo.query.get(todo_id)
		db.session.delete(todo)
		db.session.commit()
	except:
		db.session.rollback()
		error = True
	finally:
		db.session.close()
	if error:
		abort(500)
	else:
		return jsonify({'success': True})

@app.route('/lists/<list_id>/delete', methods=['DELETE'])
def delete_list(list_id):
    error = False
    try:
        list = TodoList.query.get(list_id)
        for todo in list.todos:
            db.session.delete(todo)

        db.session.delete(list)
        db.session.commit()
    except():
        db.session.rollback()
        error = True
    finally:
        db.session.close()
    if error:
        abort(500)
    else:
        return jsonify({'success': True})


@app.route('/lists/<list_id>')
def get_list_todos(list_id):
	return render_template('index.html', 
	lists=TodoList.query.order_by('id').all(),
	todos=Todo.query.filter_by(list_id=list_id).order_by('id').all(),
	active_list=TodoList.query.get(list_id)
	)

@app.route('/')
def index():
	return redirect(url_for('get_list_todos', list_id=1))


