import React from 'react';
import { Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"
import CharacterPage from "./containers/CharacterPage"

export default function App() {
  return <Switch>
        <Route path="/home/:film" component={CharacterPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
}
