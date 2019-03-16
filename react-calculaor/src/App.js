import React, { Component } from 'react';

let keys = [
  {
    value: 'AC',
    className: 'half',
    style: {background: 'rgb(172, 57, 57)'}
  },
  {
    value: '/',
    className: 'quarter',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: 'x',
    className: 'quarter',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '7',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '8',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '9',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '-',
    className: 'quarter',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '4',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '5',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '6',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '+',
    className: 'quarter',
    style: {background: 'rgb(102, 102, 102)'}
  },
  {
    value: '1',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '2',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '3',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
  {
    value: '=',
    className: 'quarter double-height',
    style: {background: 'rgb(0, 68, 102)'}
  },
  {
    value: '0',
    className: 'half',
    style: {background: '#4d4d4d'}
  },
  {
    value: '.',
    className: 'quarter',
    style: {background: '#4d4d4d'}
  },
];

  




class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      display: '0'
    }
    // this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay = (e) => {

    if (this.state.display.length > 31) {
      this.setState({
        display: 'EXCEEDED MAX DIGITS'
      })
      setTimeout( () => {
        this.setState({
          display: 0
        })
      }, 1500)
      return
    }

    if (this.state.display === '0' && (!isNaN(e.target.innerHTML) || e.target.innerHTML === '0') ) {
      this.setState({
        display: e.target.innerHTML
      })
      return;
    } 
    switch (e.target.innerHTML) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.': 
        this.setState({
          display: this.state.display.concat(e.target.innerHTML)
        })
        break;

      case 'AC': this.setState({
        display: 0
        })
       break;
      case '+':
      case '-':
      case '/':
      case 'x':
       this.handleOperator(e.target.innerHTML);
        break;
      case '=': this.handleComputation();
        break;
      default: console.log('something went wrong');
    }
  }

  handleOperator(operator) {
    console.log(operator);
  }

  handleComputation() {
    console.log('a computation was performed')
  }
  render() {
    return (
      <div className="App">
        <p>{this.state.display}</p>
        <div className='keypad'>
          {keys.map( (button) => (
            <button key={button.value} 
                    onClick={this.updateDisplay} 
                    className={`key ${button.className}`} 
                    style={button.style}
                    disabled={this.state.display === 'EXCEEDED MAX DIGITS' ? true : false}>
              {button.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
