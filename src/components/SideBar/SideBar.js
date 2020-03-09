import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = props => {
  const userRole = props.userRole;
  return (
    <div className="sideBar__container" data-testid="sideBar">
      <div className="sideBar__headerContainer">
        <NavLink
          className="sideBar__heading"
          exact
          to="/apartments"
          activeClassName="active"
        >
          <svg className="apartmentIcon" />
          APARTMENTS
        </NavLink>
        <NavLink
          className="sideBar__heading"
          to="/occupants"
          activeClassName="active"
        >
          <svg className="occupantsIcon" />
          OCCUPANTS
        </NavLink>
        {userRole === "admin" ? (
          <NavLink
            className="sideBar__heading"
            to="/users"
            activeClassName="active"
          >
            <svg className="userManagementIcon" />
            USER MANAGEMENT
          </NavLink>
        ) : (
          ""
        )}
        {userRole === "guest" ? (
          ""
        ) : (
          <NavLink
            className="sideBar__heading"
            to="/newApartment"
            activeClassName="active"
          >
            <svg className="addIcon" />
            NEW APARTMENT
          </NavLink>
        )}
        {userRole === "guest" ? (
          ""
        ) : (
          <NavLink
            className="sideBar__heading"
            to="/newOccupant"
            activeClassName="active"
          >
            <svg className="addIcon" />
            NEW OCCUPANT
          </NavLink>
        )}
        {userRole === "admin" ? (
          <NavLink
            className="sideBar__heading"
            to="/newUser"
            activeClassName="active"
          >
            <svg className="addIcon" />
            NEW USER
          </NavLink>
        ) : (
          ""
        )}
        <NavLink
          className="sideBar__heading"
          to="/changePassword"
          activeClassName="active"
        >
          <svg className="addIcon" />
          CHANGE PASSWORD
        </NavLink>
        <NavLink
          className="sideBar__heading"
          to="/"
          activeClassName="inactive"
          onClick={props.logout}
        >
          <svg className="logoutIcon" />
          LOGOUT
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
