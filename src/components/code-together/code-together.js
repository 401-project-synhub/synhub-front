import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import pushid from 'pushid';
import '../../../node_modules/socket.io-client/dist/socket.io.js';
import socketIOClient from "socket.io-client";
import './code-together.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { withRouter } from "react-router"
import GetAppIcon from '@material-ui/icons/GetApp';
import Paint from '../paint/paint'
import Sidebar from "react-sidebar";
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';

let token;

const ENDPOINT = "https://synhub.herokuapp.com";
const socket = socketIOClient(ENDPOINT);
let roomName;
const socketId = pushid();
let theUser;
class App extends Component {
  constructor() {
    super();
    this.state = {
      html: `<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
  </head>
  <body>
    The content of the document......
  </body>
</html>`,
      css: '',
      js: '',
      html2: '',
      js2: '',
      css2: '',
      messagesArray: [],
      paintComp: false,
      sidebarOpen: false,
      isActive: '',
    };
  }

  onSetSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
    this.setState({ isActive: this.state.isActive === 'is-active' ? '' : 'is-active' })
  }

  componentWillMount() {
    roomName = this.props.match.params.room;
    this.setState({ messagesArray: [...this.state.messagesArray, { message: 'Connected', name: 'You' }] });
  }

  componentDidMount() {
    const cookieToken = cookie.load('auth');
    token = cookieToken || null;
    const userPro = cookie.load('user');
    theUser = userPro || null;
    this.runCode();
  
    const socket = socketIOClient(ENDPOINT);
    socket.on('chat-message', data => {
      console.log(data.message);
      this.setState({ html: data.message })
      return data;
    });
    socket.on('toggle-paint', data => {
      console.log('toggle', data.message);
      this.setState({ paintComp: data.message })
      return data;
    });
    socket.on('chat-message-html', data => {
      console.log(data.message);
      this.setState({ html: data.message })
      return data;
    });
    socket.on('chat-message-css', data => {
      console.log(data.message);
      this.setState({ css: data.message })
      return data;
    });
    socket.on('chat-message-js', data => {
      console.log(data.message);
      this.setState({ js: data.message })
      return data;
    })
    socket.on('chat-message-result', data => {
      console.log(data.message);
      this.setState({ html2: data.message.html, css2: data.message.css, js2: data.message.js });
      this.runCode();
      return data;
    });
    socket.on('send-comment', data => {
      console.log(data);
      this.setState({ messagesArray: [...this.state.messagesArray, data] });
    });


    console.log('react socket id', socket);
    socket.emit('new-user', roomName, `${theUser.username}`, socketId);


  }


  runCode = () => {
    const { html2, js2, css2 } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css2}
            </style>
          </head>
          <body>
            ${html2}

            <script type="text/javascript">
              ${js2}
            </script>
          </body>
          </html>
        `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  clickHandler = () => {
    console.log(this.state.html);
    socket.emit('send-chat-message-result', roomName, { html: this.state.html, css: this.state.css, js: this.state.js });
  }
 

  submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.comment.value;
    e.target.reset();
    console.log(message)
    socket.emit('comment', roomName, message, socketId);
  }

  downloadTxtFile = () => {
    const element = document.createElement("a");
    var pos = this.state.html.indexOf("<body>");
    var pos2 = this.state.html.indexOf("</body>");
    var body = this.state.html.slice(pos + 6, pos2);
    console.log(body);
    const code = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
        ${this.state.css}
      </style>
    </head>
    <body>
      ${body}

      <script type="text/javascript">
        ${this.state.js}
      </script>
    </body>
    </html>
  `;
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  toggle = () => {
    console.log('paint1', this.state.paintComp);
    let paint = !this.state.paintComp;
    console.log('paint', paint);
    this.setState({ paintComp: paint });
    console.log('paint12', this.state.paintComp)
    console.log('paint room name', roomName);
    socket.emit('send-toggle-paint', roomName, paint);
    console.log('paint2', this.state.paintComp);
  }
  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };


    return (
      <>
        <button id='sidebar' class={`hamburger hamburger--collapse ${this.state.isActive}`} type="button" onClick={() => this.onSetSidebarOpen()}>
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <Sidebar
          sidebar={<div id='side-bar-container'>
            <button className='run' onClick={this.clickHandler}>Run</button>
            <button className='draw' onClick={this.toggle}>Draw</button>


            <button>
              <NavLink className='link' to='/'>Home</NavLink>
            </button>

            <button>
              <NavLink className='link' to='/community'>Community</NavLink>
            </button>
   
            <button>
              <NavLink className='link' to='/todo'>Task Manager</NavLink>
            </button>


          </div>

          }
          open={this.state.sidebarOpen}
          pullRight={true}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              display: 'flex',
              flexDirection: 'column',
              background: '#1b2327',
              zIndex: '10000',
            }
          }}
        >
        </Sidebar>



        <div className={this.state.paintComp.toString()}>
          <Paint />
        </div>
        <div className="App">
          <section className="playground">
            <div className="code-editor html-code">
              <div onClick={this.clickHandler} className="editor-header">HTML</div>
              <GetAppIcon onClick={this.downloadTxtFile} color='secondary' ></GetAppIcon>
              <CodeMirror
                value={html}
                options={{
                  mode: 'htmlmixed',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {

                  socket.emit('send-chat-message-html', roomName, html);
                }}
              />
            </div>
            <div className="code-editor css-code">
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: 'css',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css });
                  socket.emit('send-chat-message-css', roomName, css);
                }}
              />
            </div>
            <div className="code-editor js-code">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: 'javascript',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  socket.emit('send-chat-message-js', roomName, js);
                }}
              />
            </div>
          </section>

          <section className="result">
            <iframe title="result" className="iframe" ref="iframe" />
            <div className='chat'>
              <div id='messages'>
                {
                  this.state.messagesArray.map((messageData, index) => {
                    return (
                      <p key={index + '111'}>{`${messageData.name}: ${messageData.message}`}</p>
                    )
                  })
                }
              </div>
              <form onSubmit={this.submitHandler}>
                <input name="comment" type="text" required placeholder='Type a message'></input>
                <button className='send'>Send</button>
              </form>

            </div>
          </section>

        </div>
      </>
    );
  }
}

export default withRouter(App);