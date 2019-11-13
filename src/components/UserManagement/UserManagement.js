import React, { Component } from "react";
import "./UserManagement.css";
import "../UserManagement/UserManagement.css";
import { fetchUsers, removeUser } from "../../api/api";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: []
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

  deleteUser = async id => {
    try {
      const newUsersList = await removeUser(id);
      this.setState({ usersList: newUsersList });
    } catch (err) {
      return "Unable to delete user";
    }
  };

  render() {
    return (
      <div>
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
                    <button onClick={() => this.deleteUser(user._id)}>
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
