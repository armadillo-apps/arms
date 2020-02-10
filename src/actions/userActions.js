import { authenticateUser } from "../api/api";

export const FETCH_USER = "FETCH_USER";

export const fetchUserStart = () => {
  return {
    type: FETCH_USER,
    payload: {
      loading: true,
      error: false
    }
  };
};

export const fetchUserSuccess = ({ email, role }) => {
  return {
    type: FETCH_USER,
    payload: {
      email,
      role,
      loading: false,
      error: false,
      isAuthenticated: true
    }
  };
};

export const fetchUserFailure = () => {
  return {
    type: FETCH_USER,
    payload: { loading: false, error: true, isAuthenticated: false }
  };
};

export const fetchUser = async dispatch => {
  dispatch(fetchUserStart());
  try {
    const user = await authenticateUser();
    dispatch(fetchUserSuccess(user));
  } catch (err) {
    dispatch(fetchUserFailure());
  }
};
