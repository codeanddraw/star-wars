import React from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import HomePage from "./containers/HomePage"
import CharacterPage from "./containers/CharacterPage"
import Header from './components/Header'


// Styles applied to No route container
const useStyles = makeStyles((theme) => ({
  error: {
    color: 'antiquewhite',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center'
  }
}));

//Functional component to render No route container
function NoMatch() {
  const classes = useStyles();
  let location = useLocation();

  return <>
      <h3 className={classes.error}>
        No match for <code>{location.pathname}</code>
      </h3>
    </>
}

//Functional component to render App Container with routes
export default function App() {
  return <>
    <Header />
    <Switch>
      <Route path="/star-wars/:film" component={CharacterPage} />
      <Route path="/star-wars" component={HomePage} />
      <Redirect from="/" to="/star-wars" exact /> 
      <Route path="*" component={NoMatch} />
    </Switch>
  </>
}
