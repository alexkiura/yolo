import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import request from 'superagent';
import Snackbar from 'material-ui/lib/snackbar';
import { Link } from 'react-router';
import Menu from './menu.jsx';


export default class LoginForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            username: '',
            password: '',
            token: '',
            error: false,
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.loginUser(this.state.username, this.state.password);
    }
    handleFieldChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }
    loginUser(username, password) {
    request
        .post('/api/v1/auth/login/')
        .send({'username': username, 'password': password })
        .end((err, result) => {
            if (result.status === 200) {
                this.setState({
                    token: result.body.token
                });
                localStorage.setItem('token', JSON.stringify(this.state.token));
                localStorage.setItem('username',
                    JSON.stringify(this.state.username));
                window.location.reload()
                this.props.history.pushState({token: this.state.token}, '/home');
            } else {
                this.setState({
                    error: true
                })
            }

        })
    }
    handleRequestClose() {
        this.setState({
          error: false,
        });
  }
    render() {
        return(
          <div className="body-landing">
            <Menu
              loggedIn={false}
            />
            <div className="container-fluid parent">
              <div className="component center">

                <p>Login to continue</p>
                <TextField
                  hintText="Enter your username"
                  floatingLabelText="Username"
                  type="text"
                  name="username"
                  onChange={this.handleFieldChange}
                  onEnterKeyDown={this.handleSubmit}
                  />
                <br/>
                <TextField
                  hintText="Password Field"
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={this.handleFieldChange}
                  onEnterKeyDown={this.handleSubmit}
                  />
                <br/>
                <br/>
                <RaisedButton label="LOGIN" secondary={true}
                  onMouseDown={this.handleSubmit}/>
                <br/>
                <br/>
                <p>Need an account? <Link to="/register">Sign up</Link></p>

                <Snackbar
                  className="toast-alerts"
                  open={this.state.error}
                  message="Please provide a correct username and password"
                  autoHideDuration={2000}
                  onRequestClose={this.handleRequestClose.bind(this)}
                  />
              </div>
            </div>
          </div>
        );
    }
}
