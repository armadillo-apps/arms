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

  onFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = async event => {
    try {
      event.preventDefault();
      const { email, password } = this.state;
      const response = await loginUser(email, password);
      this.props.checkIsLoggedIn(true);
      this.setState({
        success: true,
        submitted: true,
        message: response
      });
      this.props.triggerRender();
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
      <form
        className="loginFormContainer"
        onSubmit={this.onFormSubmit}
        data-testid="loginForm"
      >
        <h1 className="loginForm__heading">User Login</h1>
        <div className="loginForm">
          <Input
            id="email"
            label="Email"
            name="email"
            onChange={this.onFormChange}
            type="text"
            value={this.state.email}
            required
          />
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onFormChange}
            required
          />
        </div>
        {this.state.submitted ? (
          <ConfirmationMessage
            success={this.state.success}
            message={this.state.message}
          />
        ) : (
          ""
        )}
        <input className="loginForm__loginButton" value="Login" type="submit" />
      </form>
    );
  }
}

export default LoginForm;
