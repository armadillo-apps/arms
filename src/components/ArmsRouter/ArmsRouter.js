import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./ArmsRouter.module.css";
import SideBar from "../SideBar/SideBar";
import { Apartment } from "../Apartment/Apartment";
import NewOccupantForm from "../NewOccupantForm/NewOccupantForm";
import NewApartmentForm from "../NewApartmentForm/NewApartmentForm";
import ApartmentProfile from "../../containers/ApartmentProfile";

import NewUserForm from "../NewUserForm/NewUserForm";
import UserManagement from "../UserManagement/UserManagement";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import Occupants from "../../containers/Occupants";
import OccupantProfile from "../../containers/OccupantProfile";
import routes from "../../router/RouterPaths";

const ArmsRouter = () => {
  const { state: user } = useUserContext();

  if (user?.isAuthenticated) {
    return (
      <section className={styles.app}>
        <SideBar />
        <Switch>
          <Route exact path={routes.MAIN}>
            <Redirect to={routes.APARTMENTS} />
          </Route>
          <Route exact path={routes.APARTMENTS} render={() => <Apartment />} />
          <Route exact path={routes.OCCUPANTS} render={() => <Occupants />} />
          <Route
            path={`${routes.APARTMENTS}/:apartmentId`}
            render={() => <ApartmentProfile />}
          />
          <Route
            path={`${routes.OCCUPANTS}/:occupantId`}
            render={() => <OccupantProfile />}
          />
          {user.role === "admin" && (
            <Route exact path={routes.USERS} component={UserManagement} />
          )}
          <Route
            exact
            path={routes.NEW_APARTMENT}
            render={() => <NewApartmentForm />}
          />
          <Route
            exact
            path={routes.NEW_OCCUPANT}
            render={() => <NewOccupantForm />}
          />
          <Route
            exact
            path={routes.CHANGE_PASSWORD}
            render={() => <ChangePasswordForm />}
          />
          {user.role === "admin" && (
            <Route
              exact
              path={routes.NEW_USER}
              render={() => <NewUserForm />}
            />
          )}
          <Route component={NoMatchPage} />
        </Switch>
      </section>
    );
  }
  return (
    <section>
      <Switch>
        <Route exact path={routes.APARTMENTS}>
          <Redirect to={routes.MAIN} />
        </Route>
        <Route exact path={routes.MAIN} render={() => <LoginForm />} />
        <Route component={NoMatchPage} />
      </Switch>
    </section>
  );
};

const NoMatchPage = () => {
  return <h1>Path does not exist!</h1>;
};

export default ArmsRouter;
