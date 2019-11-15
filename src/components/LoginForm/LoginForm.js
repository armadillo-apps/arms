import React, { Component } from "react";
import "./LoginForm.css";
import Input from "../Input/Input";
import { loginUser } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      success: false,
      message: "",
      submitted: false
    };
  }

  onEmailChange = event => {
    this.props.handleEmailChange(event.target.value);
  };

  onFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = async event => {
    try {
      event.preventDefault();
      const { password } = this.state;
      const { email } = this.props;
      const response = await loginUser(email, password);
      this.props.setUserRole(response);
      this.props.checkIsLoggedIn(true);
      this.setState({
        success: true,
        submitted: true,
        message: response
      });
      this.props.history.push("/apartments");
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
        <h1 className="loginForm__header">
          Apartments and Residential Management System
        </h1>
        <h2 className="loginForm__heading">User Login</h2>
        <div className="loginForm">
          <Input
            id="email"
            label="Email"
            name="email"
            onChange={this.onEmailChange}
            type="text"
            value={this.props.email}
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

          {this.state.submitted ? (
            <ConfirmationMessage
              success={this.state.success}
              message={this.state.message}
            />
          ) : (
            ""
          )}
          <input
            className="loginForm__loginButton"
            value="Login"
            type="submit"
          />
        </div>
      </form>
    );
  }
}

export default LoginForm;
