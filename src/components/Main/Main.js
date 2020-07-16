import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SidebarDrawer from "../../containers/SidebarDrawer";
import routes from "../../router/RouterPaths";
import styles from "./Main.module.scss";
import { useUserContext } from "../../context/UserContext";
import ApartmentProfile from "../../containers/ApartmentProfile";
import OccupantProfile from "../../containers/OccupantProfile";
import { Apartment } from "../Apartment/Apartment";
import Occupants from "../../containers/Occupants";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";
import NewApartmentForm from "../NewApartmentForm/NewApartmentForm";
import NewUserForm from "../NewUserForm/NewUserForm";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import UserManagement from "../UserManagement/UserManagement";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { state: user } = useUserContext();

  return (
    <Route
      {...rest}
      render={props =>
        user?.isAuthenticated && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <NoMatchPage />
        )
      }
    ></Route>
  );
};

const ManagerRoute = ({ component: Component, ...rest }) => {
  const { state: user } = useUserContext();

  return (
    <Route
      {...rest}
      render={props =>
        user?.isAuthenticated &&
        (user.role === "manager" || user.role === "admin") ? (
          <Component {...props} />
        ) : (
          <NoMatchPage />
        )
      }
    ></Route>
  );
};

const NoMatchPage = () => {
  return <h1>Path does not exist!</h1>;
};

const Main = () => {
  return (
    <section className={styles.app}>
      <SidebarDrawer />
      <Switch>
        <Route exact path={routes.APARTMENTS} component={Apartment} />
        <Route exact path={routes.MAIN}>
          <Redirect to={routes.APARTMENTS} />
        </Route>
        <Route exact path={routes.OCCUPANTS} component={Occupants} />
        <Route
          path={`${routes.APARTMENTS}/:apartmentId`}
          component={ApartmentProfile}
        />
        <Route
          path={`${routes.OCCUPANTS}/:occupantId`}
          component={OccupantProfile}
        />
        <Route
          exact
          path={routes.CHANGE_PASSWORD}
          component={ChangePasswordForm}
        />
        <ManagerRoute
          exact
          path={routes.NEW_APARTMENT}
          component={NewApartmentForm}
        />
        <ManagerRoute
          exact
          path={routes.NEW_OCCUPANT}
          component={NewOccupantForm}
        />
        <AdminRoute exact path={routes.USERS} component={UserManagement} />
        <AdminRoute exact path={routes.NEW_USER} component={NewUserForm} />
        <Route component={NoMatchPage} />
      </Switch>
    </section>
  );
};

export default Main;
