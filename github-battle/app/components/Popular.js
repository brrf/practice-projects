import React from 'react';
import {fetchPopularRepos} from '../utils/Api';
import PropTypes from 'prop-types';
import Loading from './Loading';

function SelectLanguage ({selectedLanguage, onSelect}) {

	const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];


	return (
		<ul className="languageList">
		  	{languages.map( lang => 
		  		<li 
		  			style={lang === selectedLanguage ? {color: '#d0021b'} : null}
		  			onClick={() => onSelect(lang)}
			  		key={lang}>
			  			{lang}
		  		</li>
		  	)}
		</ul>
	)
}

function RepoGrid ({repos}) {

	return (
		<ul className='popular-list'>
			{repos.map( ({name, owner, stargazers_count, html_url}, index) =>
			<li key={name} className='popular-item'>
				<div className='popular-rank'>#{index + 1}</div>
				<ul className='space-list-items'>
					<li>
						<img
							src={owner.avatar_url}
							alt={'avatar for ' + owner.login}
							className='avatar' />
					</li>
					<li><a href={html_url}>{name}</a></li>
					<li>@{owner.login}</li>
					<li>{stargazers_count} stars</li>
				</ul>
			</li> )}
		</ul>
		)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
	state = {
		selectedLanguage: 'All',
		repos: null
	};
	
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = (lang) => {
		this.setState( () => ({
			selectedLanguage: lang,
			repos: null
		}));

		fetchPopularRepos(lang)
			.then(repos => {
				this.setState( () => ({
					repos: repos
				}))
			})
	}

	render() {
		const {repos, selectedLanguage} = this.state;

		return (
			<div>
				<SelectLanguage 
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!repos ? <Loading /> : <RepoGrid repos={repos} />}
				
			</div>
		)
	}
}

export default Popular