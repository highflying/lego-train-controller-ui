import React, { Component } from "react";
import "./App.css";
import { Route, Router } from "react-router";
import createHistory from "history/createBrowserHistory";
import { Link, Switch } from "react-router-dom";
import Trains from "./Components/Trains";
import withRoot from "./withRoot";
import { AppBar, Typography } from "@material-ui/core";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <AppBar position="static">
            <Typography variant="h6" color="inherit" noWrap>
              <Link to="/trains">Trains</Link>
            </Typography>
          </AppBar>
          <Switch>
            <Route path="/trains" component={Trains} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRoot(App);
