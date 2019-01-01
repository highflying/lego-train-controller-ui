import React, { Component } from "react";
import "./App.css";
import { Route, Router } from "react-router";
import createHistory from "history/createBrowserHistory";
import { Link, Switch } from "react-router-dom";
import Trains from "./Components/Trains";
import withRoot from "./withRoot";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core";

const history = createHistory();

const styles = createStyles({
  appBar: {
    marginBottom: 20
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
});

const App = ({ classes }: WithStyles<typeof styles>) => (
  <Router history={history}>
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/trains" className={classes.link}>
              <Button className={classes.link}>Trains</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/trains" component={Trains} />
      </Switch>
    </div>
  </Router>
);

export default withRoot(withStyles(styles)(App));
