import React, { Component } from "react";
import "./LoginForm.css";
import Input from "../Input/Input";
import { loginUser } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      message: "",
      submitted: false
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onLogin = async () => {
    try {
      const { email, password } = this.state;
      await loginUser(email, password);
      this.setState({
        success: true,
        submitted: true,
        message: "You are logged in"
      });
    } catch (err) {
      this.setState({
        success: false,
        message: "Invalid email or password",
        submitted: true
      });
    }
  };

  render() {
    return (
      <div className="loginFormContainer">
        <h1 className="loginForm__heading">User Login</h1>
        <div className="loginForm">
          <Input
            id="email"
            label="Email"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <button
            className="loginForm__loginButton"
            aria-label="login"
            onClick={this.onLogin}
          >
            Login
          </button>
          {this.state.submitted ? (
            <ConfirmationMessage
              success={this.state.success}
              message={this.state.message}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default LoginForm;
