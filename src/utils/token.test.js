import { removeToken, getToken, setToken } from "./token";

describe("token utils", () => {
  Object.defineProperty(window, "localStorage", {
    value: {
      setItem: jest.fn(() => null),
      getItem: jest.fn(() => null),
      removeItem: jest.fn(() => null)
    },
    writable: true
  });
  const accessToken = "someToken";

  it("should store token in local storage", () => {
    setToken(accessToken);

    expect(window.localStorage.setItem).toBeCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith("token", accessToken);
  });

  it("should get token from local storage", () => {
    getToken();

    expect(window.localStorage.getItem).toBeCalledTimes(1);
    expect(window.localStorage.getItem).toBeCalledWith("token");
  });

  it("should remove token from local storage", () => {
    removeToken();

    expect(window.localStorage.removeItem).toBeCalledTimes(1);
    expect(window.localStorage.removeItem).toBeCalledWith("token");
  });
});
