import React, { Component } from 'react';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import Loading from './Loading'
import {handleInitialData} from '../actions/Shared'
import {connect} from 'react-redux'


class App extends React.Component {

	componentDidMount () {
		this.props.dispatch(handleInitialData())
	}

	render() {

		const {loading} = this.props

		if (loading) {
			return <Loading />
		}

		return (
			<div>
				<ConnectedTodos />
				<ConnectedGoals />
			</div>
		)
	}
}

export default connect( (state) => ({
	loading: state.loading
}))(App)
