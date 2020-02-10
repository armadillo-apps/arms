import React, { useReducer, useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import { userReducer } from "./reducer/userReducer";
import { fetchUser } from "./actions/userActions";
import ArmsRouter from "./components/ArmsRouter/ArmsRouter";

const App = () => {
  let [state, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return state.loading || state.loading === undefined ? (
    <p>Loading</p>
  ) : (
    <UserProvider user={state}>
      <ArmsRouter dispatch={dispatch} />
    </UserProvider>
  );
};
export default App;
