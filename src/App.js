import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
import Community from './components/community-components/community';
import ShowMore from './components/show-more-component/showmore';
import AddQuestion from './components/add-question/add-question';
import Auth from './components/auth';
import SignUp from './components/signup/'
import SignIn from './components/signin/'


//context 
import SignInProvider from './context/auth';

// import './community.scss';

// import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>

          <Community exact path='/' />
          <Route exact path='/details/:id' component={ShowMore} />

          <SignInProvider >
            <SignUp />
            <SignIn />
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
