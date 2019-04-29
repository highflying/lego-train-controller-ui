import React from "react";
import "./App.css";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";
import { Link, Switch } from "react-router-dom";
import Trains from "./Components/Trains";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import Blah from "./Components/Blah";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/styles";

const theme = createMuiTheme({});

const history = createBrowserHistory();

const useStyles = makeStyles({
  appBar: {
    marginBottom: 20
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div className="App">
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/trains" className={classes.link}>
                  <Button className={classes.link}>Trains</Button>
                </Link>
                <Link to="/blah" className={classes.link}>
                  <Button className={classes.link}>Blah</Button>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/trains" component={Trains} />
            <Route path="/blah" component={Blah} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
