import './App.css';

import React, {Component} from "react";

import HomePage from "./pages/HomePage.react";
import Error404 from "./pages/Error404.react";
import Navigation from "./components/Navigation.react";
import Infolist from './components/Infolist.react';
import History from './components/history.react';
import Update from "./components/update.react";

import LOGIN_PAGE from "./components/login.react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false
    }
    this.LogIn = this.LogIn.bind(this);
  }

  LogIn(data){
    let login = localStorage.getItem("Logged_in");
    if(login=='true'){
      this.setState({
        logged_in:true
      })
    }
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/auth')
  }
  render(){
    if(this.state.logged_in==false){
      return (
          <LOGIN_PAGE action={this.LogIn}/>
      );
    }
    else {
      return (
          <React.StrictMode>
            <Router>
              <Navigation/>
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/history/:id" component={History}/>
                <Route path="/history" component={History}/>
                <Route path="/update/:id" component={Update}/>
                <Route path="/update" component={Update}/>
                <Route component={Error404}/>
              </Switch>
            </Router>
          </React.StrictMode>
      );
    }
  }
    
}

export default App;
