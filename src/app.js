import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Community from './components/community-components/community';
import ShowMore from './components/show-more-component/showmore';
import AddQuestion from './components/add-question/add-question';
import Auth from './components/auth';
import TagsSearch from './components/tags-search/tags-search'
import Search from './components/search/search'

// import SignUp from './components/signup/'
// import SignIn from './components/signin/'
import Header from './components/header/header.js'

import './app.scss';

import SignInProvider from './context/auth';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <SignInProvider >
            <Header />
            <Route exact path='/details/:id' component={ShowMore} />
              <Route exact path='/'>
                <Community />
              </Route>
            <Route exact path='/tags/:tag' component={TagsSearch} />
            <Route exact path='/search/:key' component={Search} />

            <Auth capabilities='read'>
              <Route exact path='/addquestion' component={AddQuestion} />
            </Auth>
          </SignInProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
