import React from "react";

import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SideBar = props => {
  const userRole = props.userRole;
  return (
    <div className={styles.container} data-testid="sideBar">
      <div className={styles.headerContainer}>
        <NavLink
          className={styles.header}
          exact
          to="/apartments"
          activeClassName={styles.active}
        >
          <svg className={styles.apartmentIcon} />
          APARTMENTS
        </NavLink>
        <NavLink
          className={styles.header}
          to="/occupants"
          activeClassName={styles.active}
        >
          <svg className={styles.occupantsIcon} />
          OCCUPANTS
        </NavLink>
        {userRole === "admin" ? (
          <NavLink
            className={styles.header}
            to="/users"
            activeClassName={styles.active}
          >
            <svg className={styles.userManagementIcon} />
            USER MANAGEMENT
          </NavLink>
        ) : (
          ""
        )}
        {userRole === "guest" ? (
          ""
        ) : (
          <NavLink
            className={styles.header}
            to="/newApartment"
            activeClassName={styles.active}
          >
            <svg className={styles.addIcon} />
            NEW APARTMENT
          </NavLink>
        )}
        {userRole === "guest" ? (
          ""
        ) : (
          <NavLink
            className={styles.header}
            to="/newOccupant"
            activeClassName={styles.active}
          >
            <svg className={styles.addIcon} />
            NEW OCCUPANT
          </NavLink>
        )}
        {userRole === "admin" ? (
          <NavLink
            className={styles.header}
            to="/newUser"
            activeClassName={styles.active}
          >
            <svg className={styles.addIcon} />
            NEW USER
          </NavLink>
        ) : (
          ""
        )}
        <NavLink
          className={styles.header}
          to="/changePassword"
          activeClassName={styles.active}
        >
          <svg className={styles.addIcon} />
          CHANGE PASSWORD
        </NavLink>
        <NavLink className={styles.header} to="/" onClick={props.logout}>
          <svg className={styles.logoutIcon} />
          LOGOUT
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
