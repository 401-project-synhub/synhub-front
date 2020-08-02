import React from 'react';
import Header from './components/header/header.js'
import Home from './components/home/home.js'
import CodeTogether from './components/code-together/code-together.js';
import RoomsForm from './components/code-together/rooms-from/rooms-from.js';
//////////
import Paint from './components/paint/paint.js'
//////////
import { BrowserRouter, Route } from 'react-router-dom';

import './app.scss';
function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route exact path='/coding' component={(props) => <RoomsForm {...props} key={window.location.pathname}/>} />
          <Route exact path='/coding/:room'>
            <CodeTogether />
          </Route>
          {/* ////////// */}
          <Route exact path='/paint'>
            <Paint />
          </Route>
          {/* ////////// */}
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;
