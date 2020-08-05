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
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Footer from './components/Footer/Footer.js';
import GitHub from './components/oauthsign/github';
import LinkedIn from './components/oauthsign/linkedin';
import Hello from './components/hello/'
import Hey from './components/hello/LI'
import Profile from './components/profile/profile'
import TrelloList from "./components/TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./components/TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "./actions";
import Routes from "./routes";
import TrelloBoard from "./components/TrelloBoard.js";
import TrelloHome from "./components/Home";
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
                {/* <Routes /> */}
                <GitHub />
                <LinkedIn />
              </Route>

              <Route path='/profile' >
                <Profile />
                <Route exact path='/profile/:id' component={ShowMore} />

              </Route>

              <Route exact path='/oauth' component={Hello} />
              <Route component={Routes} />
              {/* <Route exact path='/coding' component={(props) => <RoomsForm {...props} key={window.location.pathname} />} /> */}
              <Route exact path='/coding/:room'>
                <CodeTogether />
              </Route>
              {/* <Route path='/community'>
                <Community /> */}
              <Route  path='/community'>
                <Community />
                <Route exact path='/community/:id' component={ShowMore} />
              </Route>
              {/* <Route exact path='/community/search'>
                <Community />
              </Route> */}
              <Route exact path='/search/:key' component={Search} />
              <Route exact path='/tags/:tag' component={TagsSearch} />
              {/* <Auth capabilities='read'>
                <Route exact path='/community/addquestion' component={AddQuestion} />
              </Auth> */}
              {/* </Auth> */}
              <Route path="/todo" exact component={TrelloHome} />
              <Route path="/todo/:boardID" component={TrelloBoard} />
            </main>
            {/* <Footer/> */}
          </SignInProvider>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
