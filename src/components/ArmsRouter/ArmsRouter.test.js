import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { render, fireEvent } from "@testing-library/react";
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

  it("should allow admin to navigate to all the pages", () => {
    const loggedInState = {
      loading: false,
      error: false,
      isAuthenticated: true,
      role: "admin"
    };

    const TESTID_TO_TEXTINPAGE_MAP = [
      { testId: "sideBar-apartments", textInPage: "Apartment Name" },
      { testId: "sideBar-occupants", textInPage: "Employee ID" },
      { testId: "sideBar-users", textInPage: "Email" },
      { testId: "sideBar-changePassword", textInPage: "Existing Password*" }
    ];

    const { getByTestId, getByText } = render(
      <UserProvider user={loggedInState}>
        <ArmsRouterWithToastContext />
      </UserProvider>
    );

    TESTID_TO_TEXTINPAGE_MAP.forEach(entry => {
      const sidebarLink = getByTestId(entry.testId);
      fireEvent.click(sidebarLink);
      expect(getByText(entry.textInPage)).toBeInTheDocument();
    });
  });

  it("should allow manager to navigate to only the pages allowed", () => {
    const loggedInState = {
      loading: false,
      error: false,
      isAuthenticated: true,
      role: "manager"
    };

    const TESTID_TO_TEXTINPAGE_MAP = [
      { testId: "sideBar-apartments", textInPage: "Apartment Name" },
      { testId: "sideBar-occupants", textInPage: "Employee ID" },
      { testId: "sideBar-changePassword", textInPage: "Existing Password*" }
    ];

    const { getByTestId, getByText } = render(
      <UserProvider user={loggedInState}>
        <ArmsRouterWithToastContext />
      </UserProvider>
    );

    TESTID_TO_TEXTINPAGE_MAP.forEach(entry => {
      const sidebarLink = getByTestId(entry.testId);
      fireEvent.click(sidebarLink);
      expect(getByText(entry.textInPage)).toBeInTheDocument();
    });
  });

  it("should allow guest to navigate to only the pages allowed", () => {
    const loggedInState = {
      loading: false,
      error: false,
      isAuthenticated: true,
      role: "guest"
    };

    const TESTID_TO_TEXTINPAGE_MAP = [
      { testId: "sideBar-apartments", textInPage: "Apartment Name" },
      { testId: "sideBar-occupants", textInPage: "Employee ID" },
      { testId: "sideBar-changePassword", textInPage: "Existing Password*" }
    ];

    const { getByTestId, getByText } = render(
      <UserProvider user={loggedInState}>
        <ArmsRouterWithToastContext />
      </UserProvider>
    );

    TESTID_TO_TEXTINPAGE_MAP.forEach(entry => {
      const sidebarLink = getByTestId(entry.testId);
      fireEvent.click(sidebarLink);
      expect(getByText(entry.textInPage)).toBeInTheDocument();
    });
  });
});
