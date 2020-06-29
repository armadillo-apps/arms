import React from "react";

import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useUserContext } from "../../context/UserContext";
import { LOGOUT_USER } from "../../reducer/userReducer";
import { logoutUser } from "../../api/api";

const SideBar = () => {
  const { state, dispatch } = useUserContext();
  const userRole = state.role;

  const onLogout = async () => {
    dispatch({ type: LOGOUT_USER });
    await logoutUser();
  };

  return (
    <div className={styles.container} data-testid="sideBar">
      <div className={styles.linksContainer}>
        <NavLink
          className={styles.links}
          exact
          to="/apartments"
          activeClassName={styles.active}
          data-testid="sideBar-apartments"
        >
          <svg className={styles.apartmentIcon} />
          APARTMENTS
        </NavLink>
        <NavLink
          className={styles.links}
          to="/occupants"
          activeClassName={styles.active}
          data-testid="sideBar-occupants"
        >
          <svg className={styles.occupantsIcon} />
          OCCUPANTS
        </NavLink>
        {userRole === "admin" ? (
          <NavLink
            className={styles.links}
            to="/users"
            activeClassName={styles.active}
            data-testid="sideBar-users"
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
          data-testid="sideBar-changePassword"
        >
          <svg className={styles.addIcon} />
          CHANGE PASSWORD
        </NavLink>
        <NavLink className={styles.links} to="/" onClick={onLogout}>
          <svg className={styles.logoutIcon} />
          LOGOUT
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
