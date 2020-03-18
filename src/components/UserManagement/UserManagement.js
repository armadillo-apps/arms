import React, { Component } from "react";

import { fetchUsers, removeUser, editUserRole } from "../../api/api";
import DeleteUserModal from "../Modal/DeleteUserModal";
import EditUserModal from "../Modal/EditUserModal";
import styles from "./UserManagement.module.css";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      userToDelete: "",
      userToEdit: "",
      isConfirmationModalOpen: false,
      isEditUserModalOpen: false,
      success: false,
      message: "",
      newRole: ""
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

  openEditUserModal = () => {
    this.setState({ isEditUserModalOpen: true });
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

  editUser = async role => {
    try {
      const newUsersList = await editUserRole(this.state.userToEdit, role);
      this.setState({ usersList: newUsersList });
    } catch (err) {
      this.setState({ message: "Unable to edit user role" });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.userManagementContainer}>
          <h1 className={styles.header1}>User Management</h1>
          <DeleteUserModal
            modalIsOpen={this.state.isConfirmationModalOpen}
            closeModal={() => this.closeModal("isConfirmationModalOpen")}
            deleteUser={this.deleteUser}
            contentLabel="DeleteUserModal"
            success={this.state.success}
            message={this.state.message}
          />
          <EditUserModal
            modalIsOpen={this.state.isEditUserModalOpen}
            closeModal={() => this.closeModal("isEditUserModalOpen")}
            editUser={this.editUser}
            contentLabel="EditUserModal"
            success={this.state.success}
            message={this.state.message}
          />
        </div>
        <table className={styles.table} cellSpacing="0" cellPadding="0">
          <thead className={styles.header2}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersList.map(user => {
              return (
                <tr key={user._id} className={styles.details}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={event => {
                        this.openEditUserModal(event);
                        this.setState({ userToEdit: user._id });
                      }}
                    >
                      Edit Role
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.deleteButton}
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
