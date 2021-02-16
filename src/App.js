import './App.css';

import React, {Component} from "react";

import HomePage from "./pages/HomePage.react";
import Error404 from "./pages/Error404.react";
import Navigation from "./components/Navigation.react";
import Infolist from './components/Infolist.react';
import History from './components/history.react';
import Update from "./components/update.react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <React.StrictMode>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/history/:id" component={History} />
            <Route path="/history" component={History} />
            <Route path="/update" component={Update} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </React.StrictMode>
    );
  }
    
}

export default App;
