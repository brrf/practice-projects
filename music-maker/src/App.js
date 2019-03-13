import React, { Component } from 'react';

const bank1 = [
  {
    id: 'Chord-1',
    keyboard: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    id: 'Chord-2',
    keyboard: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    id: 'Chord-3',
    keyboard: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    id: 'Shaker',
    keyboard: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    id: 'Open-HH',
    keyboard: 'S',
    url:  'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    id: 'Closed-HH',
    keyboard: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    id: 'Punchy-Kick',
    keyboard: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    id: 'Side-stick',
    keyboard: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    id: 'Snare',
    keyboard: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  },  
]

const bank2 = [
  {
    id: 'Heater-1',
    keyboard: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    id: 'Heater-2',
    keyboard: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    id: 'Heater-3',
    keyboard: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    id: 'Heater-4',
    keyboard: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    id: 'Clap',
    keyboard: 'S',
    url:  'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    id: 'Open-HH',
    keyboard: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    id: 'Kick-n-Hat',
    keyboard: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    id: 'Kick',
    keyboard: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    id: 'Closed-HH',
    keyboard: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_h3.mp3'
  },  
]



const Power = ({togglePower}) => (
  <label className="switch">
    <input type="checkbox" onClick={togglePower} />
    <span className="slider"></span>
  </label>
)

const Bank = ({toggleBank}) => (
    <label className="switch">
      <input type="checkbox" onClick={toggleBank} />
      <span className="slider"></span>
    </label>
)

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      power: true,
      bank: bank1,
      display: 'POWER: ON',
      volume: 66
    }

    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
  }

  componentDidMount () {

    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyQ': {
          const clip = document.getElementById(this.state.bank[0].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return ;
        }
        case 'KeyW': {
          const clip = document.getElementById(this.state.bank[1].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyE': {
         const clip = document.getElementById(this.state.bank[2].keyboard);
         clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyA': {
         const clip = document.getElementById(this.state.bank[3].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyS': {
         const clip = document.getElementById(this.state.bank[4].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyD': {
         const clip = document.getElementById(this.state.bank[5].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyZ': {
         const clip = document.getElementById(this.state.bank[6].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyX': {
         const clip = document.getElementById(this.state.bank[7].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        case 'KeyC': {
          const clip = document.getElementById(this.state.bank[8].keyboard);
          clip.currentTime = 0;
          clip.play()
          this.setState({
            display: clip.id
          })
          return;
        }
        default: return;
      }
    })      
  }

  playSound = (sound) => {
    if (!this.state.power) return;
    const clip = document.getElementById(sound.keyboard);
    clip.currentTime = 0;
    clip.play()
    this.setState({
      display: clip.id
    })
  }

  togglePower () {
    this.setState({
      power: !this.state.power,
      display: this.state.power ? 'POWER: OFF' : 'POWER: ON'
    })
  }

  toggleBank () {
    this.state.bank === bank1
      ? this.setState({
        bank: bank2,
        display: 'Heater Kit'
      })
      : this.setState({
        bank: bank1,
        display: 'Smooth Piano Kit'
      })

      setTimeout( () => {
        if (!this.state.power) {
          this.setState({
          display: 'POWER: OFF'
          })
        }
      }, 1500)
  }

  adjustVolume (e) {
    this.setState({
      volume: Math.floor(e.target.value),
      display: Math.floor(e.target.value)
    })

    let buttons = document.querySelectorAll('button > audio');
    console.log(buttons)
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].volume = e.target.value/100
    }

    setTimeout( () => {
      if (!this.state.power) {
        this.setState({
        display: 'POWER: OFF'
        })
      }
    }, 2000)
  }

  render() {

    const {bank, power, display, volume} = this.state;
        
    return (
      <div id='drum-machine' className={this.state.power ? 'live-app' : ''}>
        <div className='keyboard'>
            {bank.map( (sound, id) => (
                <button key={sound.id} className="drum-pad" id={sound.url} onClick={this.playSound.bind(this, sound)}>{sound.keyboard}
                  <audio src={sound.url} id={sound.keyboard}className='clip' >
                    <source  type="audio/mpeg" />
                  </audio>
                </button>
            ))}
        </div>
        <div className='controls'>
          <div className='toggle'>
            <h3>{power ? 'ON' : 'OFF' }</h3>
            <Power togglePower={this.togglePower}/>
          </div>
          <p id='display'>{display}</p>
          <div className='toggle'>
            <h3>{bank === bank1 ? 'BANK1' : 'BANK2'}</h3>
            <Bank toggleBank={this.toggleBank} />
          </div>
          
          <input type="range" min="0" max="100" step="any" value={volume} onChange={this.adjustVolume}/>
        </div>

      </div>
    )
  }
}

export default App;
