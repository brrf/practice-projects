var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class Languages extends React.Component {
	constructor (props) {
		super (props);
			
		this.state = {
			selectedLanguage: 'All'
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	
	updateLanguage (lang) {
		this.setState({
			selectedLanguage: lang		
		})
	}

	render () {

	const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];


	return (
	  <ul className="languageList">
	  	{languages.map( lang => 
	  		<li 
	  			style={lang === this.state.selectedLanguage ? {color: '#d0021b'} : null}
	  			onClick={this.updateLanguage.bind(null, lang)}
		  		key={lang}>
		  			{lang}
	  		</li>
	  	)}
	  </ul>
	)

  	}
}

// Languages.propTypes = {
// 	list: PropTypes.array.isRequired,
	
// }

ReactDOM.render(<Languages />, 
					document.getElementById('app')
				)