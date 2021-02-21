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
  constructor(props){
    super(props);
    this.state = {
      title: null
    }
  }
  componentDidMount() {
    fetch('http://localhost:3001/api')
      .then(res => res.json())
      .then(data => this.setState({title: data.title}));
  }
  render(){
    return (
      <React.StrictMode>
        <Router>
          <Navigation />
          <div>
            {this.state.title? <h1>{this.state.title}</h1>:<h1>loading...</h1>}
          </div>
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
