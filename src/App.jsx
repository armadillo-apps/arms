import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { userReducer } from "./reducer/userReducer";
import { fetchUser } from "./actions/userActions";
import ArmsRouter from "./components/ArmsRouter/ArmsRouter";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  let [state, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return state.loading || state.loading === undefined ? (
    <p>Loading</p>
  ) : (
    <ToastProvider autoDismissTimeout={3000}>
      <UserProvider user={state}>
        <Router>
          <ArmsRouter dispatch={dispatch} />
        </Router>
      </UserProvider>
    </ToastProvider>
  );
};
export default App;
