import React, { Component, Fragment } from 'react';
import './paint.scss';
import Canvas from './canvas';
class App extends Component {
  render() {
    return (
      <Fragment>
        <h3 style={{ textAlign: 'center' }}>Paint</h3>
        <div className="main">
          {/* <div className="color-guide">
            <h5>Color Guide</h5>
            <div className="user user">Your Drawing</div>
            <div className="user guest">Other users' Drawing</div>
          </div> */}
          <Canvas />
        </div>
      </Fragment>
    );
  }
}
export default App;