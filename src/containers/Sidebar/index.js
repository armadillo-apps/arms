import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { useUserContext } from "../../context/UserContext";
import { LOGOUT_USER } from "../../reducer/userReducer";
import { logoutUser } from "../../api/api";

import UsersLogo from "../../assets/userManagement.svg";
import LogoutLogo from "../../assets/logout.svg";
import { sidebarLinks } from "./constants";
import { roles } from "../../constants/roles";
import { removeToken } from "../../utils/token";

const Sidebar = () => {
  const { state, dispatch } = useUserContext();
  const [visible, setVisible] = useState(false);
  const userRole = state.role;

  const onLogout = async () => {
    dispatch({ type: LOGOUT_USER });
    removeToken();
    await logoutUser();
  };

  const handleHover = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={visible ? styles.container : styles.containerCollapsed}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className={styles.linksContainer}>
        <NavLink
          className={styles.links}
          exact
          to="/"
          activeClassName={styles.active}
        >
          {visible ? "ARMS" : "A"}
        </NavLink>
        {sidebarLinks.map((menuItem, index) => (
          <NavLink
            key={index}
            className={styles.links}
            exact
            to={menuItem.pathname}
            activeClassName={styles.active}
            data-testid={`sideBar-${menuItem.imgAlt.replace(/\s/g, "")}`}
          >
            <img src={menuItem.imgUrl} alt={menuItem.imgAlt} />
            {visible && menuItem.text}
          </NavLink>
        ))}
        {userRole === roles.ADMIN && (
          <NavLink
            className={styles.links}
            exact
            to="/users"
            activeClassName={styles.active}
            data-testid="sideBar-users"
          >
            <img src={UsersLogo} alt="user management" />
            {visible ? "User Management" : ""}
          </NavLink>
        )}
        <NavLink className={styles.links} to="/" onClick={onLogout}>
          <img src={LogoutLogo} alt="logout" />
          {visible ? "Logout" : ""}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
