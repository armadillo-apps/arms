import { FETCH_USER } from "../actions/userActions";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const userReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, ...action.payload };
    case LOGIN_USER:
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: true,
        ...action.payload
      };
    case LOGOUT_USER:
      return {
        email: "",
        role: "",
        loading: false,
        error: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
