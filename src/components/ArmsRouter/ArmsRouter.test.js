import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { UserProvider } from "../../context/UserContext";
import ArmsRouter from "./ArmsRouter";

const ArmsRouterWithToastContext = () => (
  <ToastProvider>
    <ArmsRouter />
  </ToastProvider>
);

describe("ArmsRouter", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ArmsRouterWithToastContext />, div);
    ReactDOM.unmountComponentAtNode(div);
    const { getByText } = render(<ArmsRouterWithToastContext />);
    expect(getByText("ARMS")).toBeInTheDocument();
  });

  it("renders Login page on load", () => {
    const { getByTestId } = render(<ArmsRouterWithToastContext />);
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
        <ArmsRouterWithToastContext />
      </UserProvider>
    );
    expect(getByTestId("sideBar")).toBeInTheDocument();
    expect(getByTestId("apartments")).toBeInTheDocument();
  });
});
