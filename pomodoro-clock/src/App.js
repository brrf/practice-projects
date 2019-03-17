import React, { Component } from 'react';
import Length from './Length';
import Counter from './Counter';
import Controls from './Controls';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: true,
      active: false,
      breakLength: 300000,
      sessionLength: 1500000,
      timeElapsed: 0 
    }
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.activate = this.activate.bind(this);
    this.disactivate = this.disactivate.bind(this);
    this.reset = this.reset.bind(this);
  }

  incrementBreak () {
    this.setState({
      breakLength: this.state.breakLength + 1
    })
  }

  incrementSession () {
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
  }

  decrementBreak () {
    this.setState({
      breakLength: this.state.breakLength - 1
    })
  }

  decrementSession () {
    this.setState({
      sessionLength: this.state.sessionLength - 1
    })
  }

  activate () {
    this.setState({
      active: true
    })
    this.startCounting();
  }

  disactivate () {
    this.setState({
      active: false
    }, () => clearInterval(this.counting))

  }

  reset () {
    this.setState({
      activity: true,
      active: false,
      breakLength: 300000,
      sessionLength: 1500000,
      timeElapsed: 0 
    })
  }

  startCounting () {
    this.counting = setInterval( () => {
      if (this.state.active) {
        this.setState({
          timeElapsed: this.state.timeElapsed + 1000
        })
      }
      this.switchActivity();
    }, 1000)    
  }

  switchActivity () {
    const length = this.state.activity
      ? this.state.sessionLength
      : this.state.breakLength;

    if (this.state.timeElapsed === length) {
      this.setState({
        activity: !this.state.activity,
        timeElapsed: 0
      })
    } 
  }



  render() {
    const {activity, sessionLength, breakLength, timeElapsed} = this.state;
    const remaining = (activity)  
      ? sessionLength - timeElapsed 
      : breakLength - timeElapsed;

    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div>
          <Length activity='Break' 
                  length={this.state.breakLength} 
                  increment={this.incrementBreak}
                  decrement={this.decrementBreak}/>
          <Length activity='Session' 
                  length={this.state.sessionLength}
                  increment={this.incrementSession}
                  decrement={this.decrementSession} />
        </div>
        <Counter activity={activity === true ? 'Session' : 'Break'} 
                 remaining={remaining} />
        <Controls activate={this.activate}
                  disactivate={this.disactivate}
                  reset={this.reset}/>
        <p>{this.state.active === true ? 'true': 'false'}</p>
      </div>
    );
  }
}

export default App;
