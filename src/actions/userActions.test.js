import { fetchUser } from "./userActions";
import * as api from "../api/api";
import {
  FETCH_USER,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure
} from "./userActions";

describe("User Action Creator", () => {
  it("fetchUserStart should return correct type and payload", () => {
    const action = fetchUserStart();

    expect(action.type).toBe(FETCH_USER);
    expect(action.payload.loading).toBe(true);
    expect(action.payload.error).toBe(false);
  });

  it("fetchUserSuccess should return correct type and payload", () => {
    const user = { email: "user@tw.com", role: "admin" };

    const action = fetchUserSuccess(user);

    expect(action.type).toBe(FETCH_USER);
    expect(action.payload.email).toEqual(user.email);
    expect(action.payload.role).toEqual(user.role);
    expect(action.payload.loading).toBe(false);
    expect(action.payload.error).toBe(false);
    expect(action.payload.isAuthenticated).toBe(true);
  });

  it("fetchUserFailure should return correct type and payload", () => {
    const action = fetchUserFailure();

    expect(action.type).toBe(FETCH_USER);
    expect(action.payload.loading).toBe(false);
    expect(action.payload.error).toBe(true);
    expect(action.payload.isAuthenticated).toBe(false);
  });
});

describe("User Action", () => {
  it("should call fetchUserStart and fetchUserSuccess when the api calls successfully", async () => {
    jest
      .spyOn(api, "authenticateUser")
      .mockResolvedValue({ email: "user@tw.com", role: "admin" });
    const dispatch = jest.fn();
    const user = { email: "user@tw.com", role: "admin" };

    await fetchUser(dispatch);

    expect(dispatch).toBeCalledWith(fetchUserStart());
    expect(dispatch).toBeCalledWith(fetchUserSuccess(user));
  });

  it("should call fetchUserStart and fetchUserFailure when the api call fails", async () => {
    jest.spyOn(api, "authenticateUser").mockRejectedValue({});
    const dispatch = jest.fn();

    await fetchUser(dispatch);

    expect(dispatch).toBeCalledWith(fetchUserStart());
    expect(dispatch).toBeCalledWith(fetchUserFailure());
  });
});
