import React from 'react';

export default class Quote extends React.Component {
	constructor (props) {
		super (props);

		this.state = {
			refresh: false,
			quoteIndex: 0,
			colorIndex: 0,
			quotes: [
				{
					text: 'The question isn’t who is going to let me; it’s who is going to stop me.',
					author: 'Ayn Rand'
				},
				{
					text: 'It is never too late to be what you might have been.',
					author: 'George Eliot'
				},
				{
					text: 'Life is what we make it, always has been, always will be.',
					author: 'Grandma Moses'
				},
				{
					text: 'Build your own dreams, or someone else will hire you to build theirs.',
					author: 'Farrah Gray'
				},
			],
			colors: ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"]
		}
		this.newQuote = this.newQuote.bind(this);
	}

	componentDidMount() {
		document.body.style.backgroundColor = '#16a085'
		window.onload = function() {
			document.body.classList.remove('preload');
		}
		console.log(this.state.refresh)
	}

	newQuote () {

  		const quotes = Math.floor(this.state.quotes.length);
  		const quote = Math.floor(Math.random() * quotes);
  		const color = (this.state.colorIndex === this.state.colors.length - 1) ? 0 : this.state.colorIndex + 1

  		this.setState({
  			quoteIndex: quote,
  			colorIndex: color,
  			refresh: true
  		})
  		document.body.style.backgroundColor = [this.state.colors[color]]
  		setTimeout( () => {
  			this.setState({
  				refresh: false
  			})
  		}, 1000)

	}

	render () {
		const {quoteIndex, colorIndex, refresh, quotes, colors} = this.state;
		const buttonStyle={backgroundColor: [colors[colorIndex]], transitionDuration: '1s'};
		const tweetQuery = encodeURIComponent('"' + quotes[quoteIndex].text + '" -' + quotes[quoteIndex].author)

		return (
			
				<div id='quote-box' style={{color: [colors[colorIndex]]}}>
					<div id='text' className={refresh ? 'refresh' : '' } >
	      				<i className="fas fa-quote-left"></i>
	        			{quotes[quoteIndex].text}
	     			</div>
	     			<div className={refresh ? 'refresh' : '' } id='author'>
	     				-{quotes[quoteIndex].author}
	     			</div>

					<div className='buttons'>
						<a className='button' 
						   id='tweet-quote' 
						   href={`https://twitter.com/intent/tweet/?text=${tweetQuery}`}
						   
						   style={buttonStyle}>
							<i
								className="fab fa-twitter">
							</i>
						</a>
						<button className='button' 
								id='new-quote' 
								onClick={this.newQuote}
								style={buttonStyle}
								disabled={refresh ? true: false}>
							Get new Quote!
						</button>
					</div>
				</div>
		)
	}
}