var React = require('react');

function SelectLanguage (props) {

	const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className="languageList">
		  	{languages.map( lang => 
		  		<li 
		  			style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
		  			onClick={props.onSelect.bind(null, lang)}
			  		key={lang}>
			  			{lang}
		  		</li>
		  	)}
		</ul>
	)
}

class Popular extends React.Component {
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

	render() {
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
			</div>
		)
	}
}


module.exports = Popular;

