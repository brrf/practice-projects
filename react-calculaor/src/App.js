import React, { Component } from 'react';

let buttons = [
  'AC', '/', 'x', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, 0, '.', '='
];


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      display: 0
    }
    // this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay = (e) => {
    console.log({event: e.target})

    if (this.state.display === 0 && !isNaN(e.target.innerHTML) ) {
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
          {buttons.map( (button) => (
            <li key={button} onClick={this.updateDisplay}>
              {button}
            </li>
          ))}
      </div>
    );
  }
}

export default App;
