import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TrelloBoard from "../components/TrelloBoard";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/todo" exact component={Home} />
        <Route path="/todo/:boardID" component={TrelloBoard} />
      </div>
    </Router>
  );
};

export default AppRouter;
