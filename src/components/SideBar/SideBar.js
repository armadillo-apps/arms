import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar__container" data-testid="sideBar">
      <div className="sideBar__headerContainer">
        <Link className="sideBar__heading" to="/">
          <svg className="apartmentIcon" />
          APARTMENTS
        </Link>
        <Link className="sideBar__heading" to="/occupants">
          <svg className="occupantsIcon" />
          OCCUPANTS
        </Link>
        <Link className="sideBar__heading" to="/newApartment">
          <svg className="addIcon" />
          NEW APARTMENT
        </Link>
        <Link className="sideBar__heading" to="/newOccupant">
          <svg className="addIcon" />
          NEW OCCUPANT
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
