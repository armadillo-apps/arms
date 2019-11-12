import React, { Component } from "react";
// import SearchBar from "../SearchBar/SearchBar";
import "./UserManagement.css";
import "../ApartmentProfile/ApartmentProfile.css";
// import { removeUser } from "../../api/api";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: props.users
    };
  }

  componentDidMount() {
    console.log(this.state.data);
  }

  render() {
    return (
      <div>
        <table className="occupants__table" cellSpacing="0" cellPadding="0">
          <thead className="occupants__header2">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user._id}</td>
                  <td>
                    <button onClick={() => {}}>Delete</button>
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
