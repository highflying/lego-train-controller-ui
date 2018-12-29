import React, { Component } from "react";
import "./App.css";
import { Router } from "react-router";
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";
import { Link, Switch } from "react-router-dom";
import Trains from "./Components/Trains";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <Link to="/trains">Trains</Link>
          </header>
          <Switch>
            <Route path="/trains" component={Trains} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
