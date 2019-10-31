import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar__container" data-testid="sideBar">
      <div className="sideBar__headerContainer">
        <NavLink
          className="sideBar__heading"
          exact
          to="/"
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
        <NavLink
          className="sideBar__heading"
          to="/login"
          activeClassName="active"
        >
          <svg className="addIcon" />
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
