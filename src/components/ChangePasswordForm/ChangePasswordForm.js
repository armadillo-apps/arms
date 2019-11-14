import React, { Component } from "react";
import Input from "../Input/Input";
import { updatePassword, fetchUsers } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import "./ChangePasswordForm.css";

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: "",
      newPassword: "",
      success: false,
      message: "",
      submitted: false
    };
  }

  componentDidMount = async () => {
    try {
      const usersList = await fetchUsers();
      const loggedInUserId = usersList.find(
        user => user.email === this.props.email
      );
      this.setState({ loggedInUserId: loggedInUserId._id });
    } catch (err) {
      return err.message;
    }
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
      const { newPassword, loggedInUserId } = this.state;
      await updatePassword(loggedInUserId, newPassword);
      this.setState({
        newPassword: "",
        success: true,
        message: "Success",
        submitted: true
      });
      this.props.triggerRender();
    } catch (err) {
      this.setState({
        success: false,
        message: "Unable to change password",
        submitted: true
      });
    }
  };

  render() {
    return (
      <form
        className="changePasswordFormContainer"
        onSubmit={this.onFormSubmit}
      >
        <h1 className="changePasswordForm__heading">Change Password</h1>
        <div className="changePasswordForm">
          <Input
            id="password"
            label="New Password*"
            name="newPassword"
            onChange={this.onFormChange}
            value={this.state.newPassword}
            type="text"
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
        <input
          className="changePasswordForm__createButton"
          value="Submit"
          type="submit"
        />
      </form>
    );
  }
}

export default ChangePasswordForm;
