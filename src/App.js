import React from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import HomePage from "./containers/HomePage";
import CharacterPage from "./containers/CharacterPage";
import "./App.css";
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    color: 'antiquewhite',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center'
  }
}));

function NoMatch() {
  const classes = useStyles();
  let location = useLocation();

  return (
    <div>
      <h3 className={classes.error}>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default function App() {
  return <>
    <Header />
    <Switch>
      <Route path="/home/:film" component={CharacterPage} />
      <Route path="/home" component={HomePage} />
      <Redirect from="/" to="/home" exact /> 
      <Route path="*" component={NoMatch} />
    </Switch>
  </>
}
