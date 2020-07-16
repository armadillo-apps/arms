import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Routes from "./Routes";
import * as UserContext from "../../context/UserContext";

jest.mock("react-toast-notifications", () => ({
  useToasts: () => jest.fn()
}));

const history = { push: jest.fn() };

describe("Routes", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should render Login page on load", () => {
    const user = {
      loading: false,
      error: false,
      isAuthenticated: false
    };

    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      state: user,
      dispatch: jest.fn()
    }));

    const { queryByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes />
      </MemoryRouter>
    );

    expect(queryByTestId("sideBar-apartments")).not.toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("should render Sidebar when authenticated", async () => {
    const user = {
      loading: false,
      error: false,
      isAuthenticated: true,
      role: "guest"
    };

    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      state: user,
      dispatch: jest.fn()
    }));

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes history={history} />
      </MemoryRouter>
    );

    expect(getByTestId("sideBar-apartments")).toBeInTheDocument();
  });
});
