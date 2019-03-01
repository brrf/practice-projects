import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'



class Home extends React.Component {
	constructor (props) {
		super (props);

		this.state = {
			tab: 'unanswered'
		}
	}	
	
	changeDashboard = (event) => {
		this.setState({
			tab: event.target.innerHTML.toLowerCase()
		})
	}

	render () {

		const {answered, unanswered} = this.props;
		const tab = this.state.tab;

		const dashboardValue = tab === 'unanswered' 
			? unanswered
			: answered		

		return (
			<div>
				<ul className='dashboard-toggle'
					onClick={this.changeDashboard}>
					<button 
						style={{textDecoration: dashboardValue === unanswered ? 'underline' : null}}>
						Unanswered
					</button>
					<button 
						style={{textDecoration: dashboardValue === answered ? 'underline' : null}}>
						| Answered
					</button>
				</ul>
				<ul>
					{dashboardValue.map( (poll) => (
						<li key={poll.id}
							className='dashboard-list'>
							<Link to={`poll/${poll.id}`}>
								{poll.question}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({authedUser, users, polls}) {
	
	const answers = users[authedUser].answers;
	const answered = answers.map( (id) => polls[id]);
	const unanswered = Object.keys(polls)
		.filter( (id) => !answers.includes(id) )
		.map( (id) => polls[id] );
		
	return {answered, unanswered}
}


export default connect(mapStateToProps)(Home)