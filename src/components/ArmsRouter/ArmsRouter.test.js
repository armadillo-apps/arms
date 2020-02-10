import React from "react";
import ReactDOM from "react-dom";
import ArmsRouter from "./ArmsRouter";
import { UserProvider } from "../../context/UserContext";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("ArmsRouter", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ArmsRouter />, div);
    ReactDOM.unmountComponentAtNode(div);
    const { getByText } = render(<ArmsRouter />);
    expect(getByText("User Login")).toBeInTheDocument();
  });

  it("renders Login page on load", () => {
    const { getByTestId } = render(<ArmsRouter />);
    expect(getByTestId("loginForm")).toBeInTheDocument();
  });

  it("renders sidebar and apartments page if logged in", () => {
    const loggedInState = {
      loading: false,
      error: false,
      isAuthenticated: true
    };
    const { getByTestId } = render(
      <UserProvider user={loggedInState}>
        <ArmsRouter />
      </UserProvider>
    );
    expect(getByTestId("sideBar")).toBeInTheDocument();
    expect(getByTestId("apartments")).toBeInTheDocument();
  });
});
