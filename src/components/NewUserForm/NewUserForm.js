import React, { Component } from "react";
import "./NewUserForm.css";
import Input from "../Input/Input";
import { createNewUser } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "",
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
      const { name, email, password, role } = this.state;
      const response = await createNewUser(name, email, password, role);
      console.log(response);
      this.setState({
        name: "",
        email: "",
        password: "",
        role: "",
        success: true,
        message: "Success",
        submitted: true
      });
      this.props.triggerRender();
      //   this.props.history.push(`/occupants`);
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to create new user :(",
        submitted: true
      });
    }
  };

  render() {
    return (
      <form className="newUserFormContainer" onSubmit={this.onFormSubmit}>
        <h1 className="newUserForm__heading">Create New User</h1>
        <div className="newUserForm">
          <Input
            id="name"
            label="Name*"
            name="name"
            onChange={this.onFormChange}
            value={this.state.name}
            type="text"
            required
          />
          <Input
            id="email"
            label="Email*"
            name="email"
            onChange={this.onFormChange}
            value={this.state.email}
            type="text"
            required
          />
          <Input
            id="password"
            label="Password*"
            name="password"
            onChange={this.onFormChange}
            value={this.state.password}
            type="text"
            required
          />
          <section>
            <label htmlFor="role" className="userForm__roleLabel">
              User Role
            </label>
            <select
              id="role"
              name="role"
              onChange={this.onFormChange}
              value={this.state.role}
              type="text"
            >
              <option value="">Select Role...</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </section>
        </div>
        {this.state.submitted ? (
          <ConfirmationMessage
            success={this.state.success}
            message={this.state.message}
          />
        ) : (
          ""
        )}
        <input
          className="occupantForm__createButton"
          value="Create"
          type="submit"
        />
      </form>
    );
  }
}

export default NewUserForm;
