import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";

const SideBar = props => {
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
        <NavLink
          className="sideBar__heading"
          to="/newApartment"
          activeClassName="active"
        >
          <svg className="addIcon" />
          NEW APARTMENT
        </NavLink>
        <NavLink
          className="sideBar__heading"
          to="/newOccupant"
          activeClassName="active"
        >
          <svg className="addIcon" />
          NEW OCCUPANT
        </NavLink>
        {props.isLoggedIn ? (
          <NavLink
            className="sideBar__heading"
            to="/logout"
            activeClassName="active"
            onClick={props.logout}
          >
            <svg className="addIcon" />
            Logout
          </NavLink>
        ) : (
          <NavLink className="sideBar__heading" to="/" activeClassName="active">
            <svg className="addIcon" />
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default SideBar;
