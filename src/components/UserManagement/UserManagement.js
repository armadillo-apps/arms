import React, { Component } from "react";
import "./UserManagement.css";
import "../UserManagement/UserManagement.css";
import { fetchUsers, removeUser } from "../../api/api";
import DeleteUserModal from "../Modal/DeleteUserModal";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      userToDelete: "",
      isConfirmationModalOpen: false,
      success: false,
      message: ""
    };
  }

  componentDidMount = async () => {
    try {
      const usersList = await fetchUsers();
      this.setState({ usersList });
    } catch (err) {
      return err.message;
    }
  };

  openModal = () => {
    this.setState({ isConfirmationModalOpen: true });
  };

  closeModal = id => {
    this.setState({ [id]: false, message: "" });
  };

  deleteUser = async () => {
    try {
      const newUsersList = await removeUser(this.state.userToDelete);
      this.setState({ usersList: newUsersList });
    } catch (err) {
      this.setState({ message: "Unable to delete user" });
    }
  };

  render() {
    return (
      <div>
        <div>
          <DeleteUserModal
            modalIsOpen={this.state.isConfirmationModalOpen}
            closeModal={() => this.closeModal("isConfirmationModalOpen")}
            deleteUser={this.deleteUser}
            contentLabel="DeleteUserModal"
            success={this.state.success}
            message={this.state.message}
          />
        </div>
        <table
          className="userManagement__table"
          cellSpacing="0"
          cellPadding="0"
        >
          <thead className="userManagement__header2">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersList.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={event => {
                        this.openModal(event);
                        this.setState({ userToDelete: user._id });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserManagement;
