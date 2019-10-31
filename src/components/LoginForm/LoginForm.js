import React, { Component } from "react";
import "./LoginForm.css";
import Input from "../Input/Input";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmailChange = () => {};

  handlePasswordChange = () => {};

  render() {
    return (
      <div>
        <Input
          id="email"
          label="Email"
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleEmailChange}
          required
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required
        />
      </div>
    );
  }
}

export default LoginForm;
