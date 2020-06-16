import React from "react";

import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SideBar = props => {
  const userRole = props.userRole;
  return (
    <div className={styles.container} data-testid="sideBar">
      <div className={styles.linksContainer}>
        <NavLink
          className={styles.links}
          exact
          to="/apartments"
          activeClassName={styles.active}
        >
          <svg className={styles.apartmentIcon} />
          APARTMENTS
        </NavLink>
        <NavLink
          className={styles.links}
          to="/occupants"
          activeClassName={styles.active}
        >
          <svg className={styles.occupantsIcon} />
          OCCUPANTS
        </NavLink>
        {userRole === "admin" ? (
          <NavLink
            className={styles.links}
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
            className={styles.links}
            to="/newOccupant"
            activeClassName={styles.active}
          >
            <svg className={styles.addIcon} />
            NEW OCCUPANT
          </NavLink>
        )}
        <NavLink
          className={styles.links}
          to="/changePassword"
          activeClassName={styles.active}
        >
          <svg className={styles.addIcon} />
          CHANGE PASSWORD
        </NavLink>
        <NavLink className={styles.links} to="/" onClick={props.logout}>
          <svg className={styles.logoutIcon} />
          LOGOUT
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
