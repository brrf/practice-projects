import React from 'react'
import {connect} from 'react-redux'
import List from './List'
import {
	handleAddTodo,
	handleDeleteTodo,
	handleToggleTodo
} from '../actions/Todos'

class Todos extends React.Component {

	addItem = (e) => {
		e.preventDefault();
		this.props.dispatch(handleAddTodo(
			this.input.value,
			() => this.input.value = '' 
		))
	}

	removeItem = todo => {
		this.props.dispatch(handleDeleteTodo(todo));
	}

	toggleItem = todo => {
		this.props.dispatch(handleToggleTodo(todo))
	}

	render () {
		return (
			<div>
				<h1>Todos</h1>
				<input 
					placeholder='Add Todo'
					type='text'
					ref={(input) => this.input = input}
				/>
				<button onClick={this.addItem}>
					Add ToDo
				</button>
				<List items={this.props.todos}
					  removeItem = {this.removeItem}
					  toggleItem={this.toggleItem}/>
			</div>
		)
	}
}

export default connect( (state) => ({
	todos: state.todos
}))(Todos)