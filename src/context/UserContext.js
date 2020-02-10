import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { userReducer } from "../reducer/userReducer";

const initialState = {
  email: "",
  role: "",
  loading: false,
  error: false,
  isAuthenticated: false
};

const UserContext = createContext(initialState);
export default UserContext;
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ user, children }) => {
  const [state, dispatch] = useReducer(userReducer, user);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired
};
