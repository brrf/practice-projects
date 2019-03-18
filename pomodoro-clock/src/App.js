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
      breakLength: 0.08,
      sessionLength: 0.07,
      timeElapsed: 0 
    }
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.reset = this.reset.bind(this);
  }

  incrementBreak () { 
    if (this.state.breakLength === 60) return;

    this.setState({
      breakLength: this.state.breakLength + 1
    })
    if (!this.state.active && !this.state.activity) {
      this.setState({
        timeElapsed: 0
      })
    }
  }

  incrementSession () {
    if (this.state.sessionLength === 60) return;
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
    if (!this.state.active && this.state.activity) {
      this.setState({
        timeElapsed: 0
      })
    }
  }

  decrementBreak () {
    if (this.state.breakLength === 1) return;
    this.setState({
      breakLength: this.state.breakLength - 1
    })
    if (!this.state.active && !this.state.activity) {
      this.setState({
        timeElapsed: 0
      })
    }
  }

  decrementSession () {
    if (this.state.sessionLength === 1) return;
    this.setState({
      sessionLength: this.state.sessionLength - 1
    })
    if (!this.state.active && this.state.activity) {
      this.setState({
        timeElapsed: 0
      })
    }
  }

  toggleActive () {
    let length = this.state.activity
      ? this.state.sessionLength
      : this.state.breakLength

    let startTime = Date.now() - this.state.timeElapsed;
    this.setState(state => {
      if (state.active) {
        clearInterval(this.toggle)
      } else {
        this.toggle = setInterval( () => {
          if (Date.now() - startTime >= length * 60000) {
            startTime = Date.now();
            length === state.sessionLength 
              ? length = state.breakLength
              : length = state.sessionLength
            this.switchActivity()
          } else {
            this.setState({timeElapsed: Date.now() - startTime});  
          }                  
        })

      } 
      return {active: !state.active};   
    })     
  }

  reset () {
    clearInterval(this.toggle);
    this.setState({
      activity: true,
      active: false,
      breakLength: 5,
      sessionLength: 25,
      timeElapsed: 0 
    })
    const clip = document.getElementById('beep');
    clip.currentTime = 0;
  }

  switchActivity () {
      this.setState({
        activity: !this.state.activity,
        timeElapsed: 0
      })
      const clip = document.getElementById('beep');
      clip.currentTime = 0;
      clip.play()
  }

  render() {
    const {activity, sessionLength, breakLength, timeElapsed, active} = this.state;
    const remaining = (activity)  
      ? sessionLength * 60000 - timeElapsed 
      : breakLength * 60000 - timeElapsed;

    return (
      <div className='app'>
        <h1>Pomodoro Clock</h1>
        <div className='length-controls'>
          <Length activity='Break' 
                  length={this.state.breakLength} 
                  increment={this.incrementBreak}
                  decrement={this.decrementBreak} 
                  active={active}
                  id='break'/>
          <Length activity='Session' 
                  length={this.state.sessionLength}
                  increment={this.incrementSession}
                  decrement={this.decrementSession}
                  active={active}
                  id='session' />
        </div>
        <Counter activity={activity === true ? 'Session' : 'Break'} 
                 remaining={remaining}
                 active={active} />
        <Controls toggleActive={this.toggleActive}
                  disactivate={this.disactivate}
                  reset={this.reset}/>
        <audio src="https://goo.gl/65cBl1" id='beep'>
                    <source  type="audio/mpeg" />
        </audio>
        <p style={{color: '#00264d'}}>Coded by: Moshe Praver, MD</p>
      </div>
    );
  }
}

export default App;
