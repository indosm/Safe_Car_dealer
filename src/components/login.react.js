import React, { Component, useState} from 'react';
import Button from '@material-ui/core/Button';
import CustomInput from "./CustomInput.react";

export default class LOGIN_PAGE extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  login = e => {
    localStorage.setItem("Logged_in",false);
    fetch('http://localhost:3001/api/login?email='+this.state.email+'&pwd='+this.state.password)
    .then(res => res.json())
    .then(data => {
        if(data.result==true){
            localStorage.setItem("Logged_in",true);
        }
        this.props.action();
    });
  }

  render() {
    return (
      <div className="App">
        <form className="form">
          <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={this.handleChange}
            type="text"
          />
          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            handleChange={this.handleChange}
            type="password"
          />

          <Button type="button" color="primary" className="form__custom-button" onClick={this.login}>
            Log in
          </Button>
        </form>
      </div>
    );
  }
}
