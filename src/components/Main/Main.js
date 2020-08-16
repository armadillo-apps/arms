import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../../containers/Sidebar";
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
import { roles } from "../../constants/roles";

const RestrictedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { state: user } = useUserContext();

  return (
    <Route
      {...rest}
      render={props =>
        user?.isAuthenticated && allowedRoles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <NoMatchPage />
        )
      }
    />
  );
};

const NoMatchPage = () => {
  return <h1>Path does not exist!</h1>;
};

const Main = () => {
  return (
    <section className={styles.app}>
      <Sidebar />
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
        <RestrictedRoute
          exact
          path={routes.NEW_APARTMENT}
          allowedRoles={[roles.ADMIN, roles.MANAGER]}
          component={NewApartmentForm}
        />
        <RestrictedRoute
          exact
          path={routes.NEW_OCCUPANT}
          allowedRoles={[roles.ADMIN, roles.MANAGER]}
          component={NewOccupantForm}
        />
        <RestrictedRoute
          exact
          path={routes.USERS}
          allowedRoles={[roles.ADMIN]}
          component={UserManagement}
        />
        <RestrictedRoute
          exact
          path={routes.NEW_USER}
          allowedRoles={[roles.ADMIN]}
          component={NewUserForm}
        />
        <Route component={NoMatchPage} />
      </Switch>
    </section>
  );
};

export default Main;
