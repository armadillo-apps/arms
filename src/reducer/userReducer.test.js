import { userReducer, LOGIN_USER, LOGOUT_USER } from "./userReducer";
import { FETCH_USER } from "../actions/userActions";

describe("userReducer", () => {
  it("should return initial state", () => {
    const initialState = "abc";

    expect(userReducer(initialState, { type: "INVALID" })).toBe(initialState);
  });

  it("should handle FETCH_USER", () => {
    const state = { loading: false };
    const payload = { email: "userA", role: "admin" };

    expect(userReducer(state, { type: FETCH_USER, payload })).toEqual({
      loading: false,
      email: "userA",
      role: "admin"
    });
  });

  it("should handle LOGIN_USER", () => {
    const state = { loading: true };
    const payload = { email: "userA", role: "admin" };

    expect(userReducer(state, { type: LOGIN_USER, payload })).toEqual({
      email: "userA",
      role: "admin",
      loading: false,
      error: false,
      isAuthenticated: true
    });
  });

  it("should handle LOGOUT_USER", () => {
    const state = {
      email: "userA",
      role: "admin",
      loading: false,
      error: false,
      isAuthenticated: true
    };
    const payload = { email: "userA", role: "admin" };

    expect(userReducer(state, { type: LOGOUT_USER, payload })).toEqual({
      loading: false,
      error: false,
      isAuthenticated: false
    });
  });
});
