var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class Users extends React.Component {
	render () {
		return (
		     <div>
		        <h1>Friends</h1>
		        <ul>
		          {this.props.list
		          	.filter(user => user.friend)
		          	.map(user => <li key={user.name}>{user.name}</li>)}
		        </ul>
		        
		        <hr />
		        
		        <h1> Non Friends </h1>
		        <ul>
		            {this.props.list
		          	.filter(user => !user.friend)
		          	.map(user => <li key={user.name}>{user.name}</li>)}
		        </ul>        
	      </div>
    	)
  	}
}

Users.propTypes = {
	list: PropTypes.array.isRequired,
	
}

ReactDOM.render(<Users 
					list={[
					    { name: 'Tyler', friend: true },
					    { name: 'Ryan', friend: true },
					    { name: 'Michael', friend: false },
					    { name: 'Mikenzi', friend: false },
					    { name: 'Jessica', friend: true },
					    { name: 'Dan', friend: false } 
					]} />, 
					document.getElementById('app')
				)