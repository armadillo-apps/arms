import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sideBar__container">
      <div className="sideBar__headerContainer">
        <Link className="sideBar__heading" to="/">
          <svg className="apartmentIcon"></svg>
          APARTMENTS
        </Link>
        <Link className="sideBar__heading" to="/occupants">
          <svg className="occupantsIcon"></svg>
          OCCUPANTS
        </Link>
        <Link className="sideBar__heading" to="/newApartment">
          <svg className="addIcon"></svg>
          NEW APARTMENT
        </Link>
        <Link className="sideBar__heading" to="/newOccupant">
          <svg className="addIcon"></svg>
          NEW OCCUPANT
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
