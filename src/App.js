import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import CharacterPage from "./containers/CharacterPage";
import "./App.css";
import Header from './components/Header';

export default function App() {
  return <>
    <Header />
    <Switch>
      <Route path="/home/:film" component={CharacterPage} />
      <Route path="/home" component={HomePage} />
    </Switch>
  </>
}
