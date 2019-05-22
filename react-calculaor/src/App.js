import React, { Component } from 'react';
// import Display from './Display';
import Keypad from './KeyPad';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      display: '0',
      expression: '',
      operator: '',
      result: 0
    }
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    setInterval( () => {
      //prevent display from exceeding width of component
      if (this.state.display.length > 30 || this.state.expression.length > 35) {
        this.setState({
          display: 'EXCEEDED MAX DIGITS',
          expression: '%%%'
        }, () => {

        })
        setTimeout( () => {
          this.setState({
            display: '0',
            expression: '',
            operator: '',
            result: 0
          })
        }, 1500)
        return
      }
    }, 50)
  }

  handleEvent = (e) => {
    const value = e.target.innerHTML
    //reset whenever hit 'AC'
    if (e.target.innerHTML === 'AC') {
      this.setState({
        display: '0',
        expression: '',
        operator: '',
        result: 0
      })
      return;
    }

    //if display is at zero, only accept number inputs
    if (this.state.display === '0' && this.state.operator === '') {
      if (!isNaN(value)) {
        this.setState({
        display: value,
        expression: value,
        })
      }
      return;
    }

    //if last button was '=' and user starts with another number then reset calculator. Don't allow them to press '='' again
    if (this.state.operator === '=') {

      if (value === '=') return;
      if (!value.match(/[-x+/]$/)) {
        this.setState({
        display: value,
        expression: value,
        operator: '',
        result: 0
      })
      return;
      }
      
    }

    //if user has selected an operator, allow to change operator
    if (this.state.display.match(/[-x+/]$/)) {
      if (value.match(/[-x+/]$/)) {
        this.setState({
          display: value,
          expression: this.state.expression.slice(0, -1).concat(value),
          operator: value
        })
        return;
       } else {
        this.setState(
          {display: ''}
        , () => {
          this.updateDisplay(value)
        })
        return;
      }
    }
    //if none of the scenarios above are met, then call updateDisplay()
    this.updateDisplay(value);
  }

  updateDisplay = (value) => {

    switch (value) {
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
        this.setState({
          display: this.state.display.concat(value),
          expression: this.state.expression.concat(value),
        })
        break;
      case '.':
        if (this.state.display.match(/\./)) return;
        this.setState({
          display: this.state.display.concat(value),
          expression: this.state.expression.concat(value),
        })
        break;
      case '+':
      case '-':
      case '/':
      case 'x':
      case '=':
       this.handleOperator(value);
        break;
      default: console.log('something went wrong');
    }
  }

  handleOperator = (futureOperator) => {
    //if there's an operator, perform computation
    if (this.state.operator.match(/[-x+/]/)) {
      this.handleComputation(futureOperator)
      return;
    }
    //if no operator, assign futureOperator as an operator
    this.setState({
      result: this.state.display,
      expression: this.state.display.concat(futureOperator),
      operator: futureOperator,
      display: futureOperator,
    })
  }

  handleComputation = (futureOperator) => {    
    let result;

    switch(this.state.operator) {
      case '+': result = +this.state.result + +this.state.display
        break;
      case '-': result = +this.state.result - +this.state.display
        break;
      case 'x': result = +this.state.result * +this.state.display        
        break;
      case '/': result = +this.state.result / +this.state.display
        break;
      default: break;
    } 

    this.setState({
      result: result
    }, () => {
      futureOperator === '='
        ? this.setState({
            display: this.state.result.toString(),
            expression: this.state.expression.concat(`=${this.state.result}`),
            operator: '='
          })
        : this.setState({
            display: futureOperator,
            expression: `${this.state.expression}${futureOperator}`,
            operator: futureOperator
          })   
    })
  }

  render() {
    return (
      <div className="App">
        <div className='screen'>
          <p className='digital expression'>{this.state.expression}</p>
          <p className='digital display' id='display'>{this.state.display}</p>
        </div>
        <Keypad handleEvent={this.handleEvent} display={this.state.display} expression={this.state.expression}/>
      </div>
    );
  }
}

export default App;
