import React, { Component } from 'react';
import marked from 'marked'

class Editor extends Component {
  constructor (props) {
    super (props);

    this.state = {
      value: placeholder
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return (
      <div>
        <div className='text-editor' style={{width: '550px'}}> 
          <header className='header'>
            <div>
              <i className="fab fa-audible" style={{paddingRight: '10px'}}></i>
              <span style={{fontFamily: 'Russo One', fontSize: '15px'}}>Editor</span>
            </div>
            <i class="fas fa-window-maximize" id='resize-window'></i>
          </header>

          <textarea id='editor' style={{minHeight: '150px'}} value={this.state.value} onChange={this.handleChange}>

          </textarea> 
        </div>
        <Previewer text={this.state.value} />
      </div>
    )
  }
}

const Previewer = ({text}) => (
   <div className='text-editor' style={{width: '800px'}}> 
    <header className='header'>
      <div>
        <i className="fab fa-audible" style={{paddingRight: '10px'}}></i>
        <span style={{fontFamily: 'Russo One', fontSize: '15px'}}>Previewer</span>
      </div>
      <i class="fas fa-window-maximize" id='resize-window'></i>
    </header>
    <div id='editor' style={{minHeight: '300px'}} dangerouslySetInnerHTML={{__html: marked(text)}}></div>
  </div>
  )


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
