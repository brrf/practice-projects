import React, { Component } from 'react';
import marked from 'marked'

marked.setOptions({
  breaks: true,
});

const Header = ({title, maximized, toggleWindow}) => (
  <header className='header'>
      <div>
        <i className="fab fa-audible" style={{paddingRight: '10px'}}></i>
        <span style={{fontFamily: 'Russo One', fontSize: '15px'}}>{title}</span>
      </div>
      <i className={maximized ? "fas fa-window-minimize" : "fas fa-window-maximize"}
         id='resize-button'
         onClick={toggleWindow}></i>
    </header>
)

const Editor = ({value, changeText, style}) => (
          <textarea id="editor" className={style} value={value} onChange={changeText}>
          </textarea> 
    )

const Previewer = ({text, style}) => (
   <div id="preview" className={style} dangerouslySetInnerHTML={{__html: marked(text)}}> 
   </div>
  )

export default class App extends Component {

  constructor(props) {
    super (props);

    this.state = {
      text: placeholder,
      maximizedEditor: false,
      maximizedPreviewer: false
    }
    this.toggleEditor = this.toggleEditor.bind(this);
    this.togglePreviewer = this.togglePreviewer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEditor () {
    this.setState({
      maximizedEditor: !this.state.maximizedEditor
    })
  }

  togglePreviewer () {
    this.setState({
      maximizedPreviewer: !this.state.maximizedPreviewer
    })
  }

  handleChange (event) {
    this.setState({
      text: event.target.value
    })
  }

  render() {

    const styles = this.state.maximizedEditor 
      ? ['section maximized-section', 'text-input text-input-maximized', 'minimized', ''] 
      : this.state.maximizedPreviewer
      ? ['minimized', '', 'section maximized-section', 'text-input text-input-maximized']
      : ['section editor-section', 'text-input text-input-editor', 'section previewer-section', 'text-input text-input-previewer']
    const stylesPreviewer = this.state.maximizedPreviewer ? ['section maximized-section', 'text-input text-input-maximized'] : ['section previewer-section', 'text-input']
    return (
      <div>
        <section className={styles[0]}>
          <Header toggleWindow={this.toggleEditor} title='Editor' maximized={this.state.maximizedEditor} />
          <Editor style={styles[1]} changeText={this.handleChange} value={this.state.text}/>
        </section>

        <section className={styles[2]}>
          <Header toggleWindow={this.togglePreviewer} title='Previewer' maximized={this.state.maximizedPreviewer} />
          <Previewer style={styles[3]} text={this.state.text}/>
        </section>  
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
