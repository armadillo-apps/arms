import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "../../router/RouterPaths";
import LoginForm from "../LoginForm/LoginForm";
import Main from "../Main/Main";

const ArmsRouter = () => {
  const { state: user } = useUserContext();
  if (user?.isAuthenticated) {
    return (
      <Router>
        <Switch>
          <Route path={routes.MAIN} component={Main} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route path={routes.MAIN}>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default ArmsRouter;
