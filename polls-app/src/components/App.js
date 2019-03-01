import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import Loading from './Loading'
import Home from './Home'
import LoadingBar from 'react-redux-loading-bar'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import Poll from './Poll'
import Nav from './Nav'

class App extends React.Component {

	componentDidMount () {
	this.props.dispatch(handleInitialData())
	}

	render() {


		return (
			<Router>
				<Fragment>
					<div className='container'>
						<LoadingBar />
						<Nav />
						{this.props.loading === true
							? <Loading/>
							: <div>
								<Route path='/' exact component={Home} />
								<Route path='/leaderboard' component={Leaderboard} />
								<Route path='/poll/:id' component={Poll} />
								<Route path='/add' component={AddPoll} />
							  </div>
						}
					</div>
				</Fragment>
			</Router>
		)
	}
}

	function mapStateToProps ({authedUser}) {
		return {
			loading: authedUser === null
		}
	}

export default connect(mapStateToProps)(App)


