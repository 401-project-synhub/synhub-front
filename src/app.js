import React from 'react';
import Header from './components/header/header.js'
import Home from './components/home/home.js'
import CodeTogether from './components/code-together/code-together.js';
import RoomsForm from './components/code-together/rooms-from/rooms-from.js';
import SignInProvider from './context/auth';
import Community from './components/community-components/community';
import Auth from './components/auth/index';
import AddQuestion from './components/add-question/add-question';
import ShowMore from './components/show-more-component/showmore';
import Search from './components/search/search';
import TagsSearch from './components/tags-search/tags-search'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer.js'
import './app.scss';
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <SignInProvider>


            <main>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route exact path='/coding' component={(props) => <RoomsForm {...props} key={window.location.pathname} />} />
              <Route exact path='/coding/:room'>
                <CodeTogether />
              </Route>
              <Route exact path='/community'>
                <Community />
              </Route>
              <Route exact path='/community/search/:key' component={Search} />
              <Route exact path='/community/tags/:tag' component={TagsSearch} />
              <Route exact path='/community/details/:id' component={ShowMore} />
              <Auth capabilities='read'>
                <Route exact path='/community/addquestion' component={AddQuestion} />
              </Auth>
            </main>
            <Footer/>
          </SignInProvider>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
