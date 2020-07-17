import * as UserContext from "../../src/context/UserContext";

export const mockUserContext = user => {
  jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
    state: user,
    dispatch: jest.fn()
  }));
};
