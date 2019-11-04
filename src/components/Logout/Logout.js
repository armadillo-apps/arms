import React, { Component } from "react";
import "./Logout.css";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../api/api";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  logout = async () => {
    try {
      const logoutMessage = await logoutUser();
      this.setState({
        message: logoutMessage
      });
      this.props.triggerRender();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <NavLink
          className="sideBar__heading"
          onClick={this.logout}
          to="/login"
          activeClassName="active"
        >
          <svg className="addIcon" />
          Logout
        </NavLink>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Logout;
