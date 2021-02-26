import React from "react";
import { ToastProvider } from "react-toast-notifications";
import * as UserContext from "../../context/UserContext";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor } from "@testing-library/react";

import LoginForm from "./LoginForm";
import * as data from "../../api/api";

const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

const postSpy = jest.spyOn(data, "loginUser");
const LoginFormWithContext = (
  <ToastProvider>
    <LoginForm />
  </ToastProvider>
);

describe("Login Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  it("should have title on page ", () => {
    const { getByText } = render(LoginFormWithContext);
    expect(getByText("ARMS")).toBeInTheDocument();
  });

  it("should display the email and password input", () => {
    const { getByLabelText } = render(LoginFormWithContext);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should show a placeholder in email input area", () => {
    const { getByPlaceholderText } = render(LoginFormWithContext);

    expect(getByPlaceholderText(/john@gmail.com/i)).toBeInTheDocument();
  });

  it("should display a login button", () => {
    const { getByText } = render(LoginFormWithContext);
    expect(
      getByText(/login/i, { selector: "input[type=submit]" })
    ).toBeInTheDocument();
  });

  it("should fill in the login credentials", () => {
    const { getByLabelText } = render(LoginFormWithContext);
    const userEmail = getByLabelText("email");
    fireEvent.change(userEmail, {
      target: { value: "elson@thoughtworks.com" }
    });

    const userPassword = getByLabelText("password");
    fireEvent.change(userPassword, { target: { value: "pass1234" } });

    expect(userEmail.value).toBe("elson@thoughtworks.com");
    expect(userPassword.value).toBe("pass1234");
  });

  it("should show error notification when user submits an invalid email or password", async () => {
    postSpy.mockRejectedValueOnce({});
    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      dispatch: jest.fn()
    }));

    const { getByText, getByLabelText } = render(LoginFormWithContext);
    const userEmail = getByLabelText("email");

    fireEvent.change(userEmail, {
      target: { value: "invalid" }
    });
    const userPassword = getByLabelText("password");
    fireEvent.change(userPassword, { target: { value: "invalid" } });

    const loginButton = getByText(/login/i, {
      selector: "input[type=submit]"
    });
    fireEvent.click(loginButton);

    const loginErrorNotification = await waitFor(() =>
      getByText("Invalid email or password")
    );

    expect(window.localStorage.setItem).not.toBeCalled();
    expect(loginErrorNotification).toBeInTheDocument();
  });

  it("should redirect to apartment page when user successfully logs in", async () => {
    const user = {
      email: "test@email.com",
      role: "admin"
    };
    const accessToken = "someToken";
    postSpy.mockReturnValue({ accessToken, user });

    jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
      state: user,
      dispatch: jest.fn()
    }));

    const { getByText } = render(LoginFormWithContext);

    const loginButton = getByText(/login/i, {
      selector: "input[type=submit]"
    });
    fireEvent.click(loginButton);

    const loginSuccessMessage = await waitFor(() => getByText("Welcome back!"));
    expect(loginSuccessMessage).toBeInTheDocument();

    expect(window.localStorage.setItem).toBeCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith("token", accessToken);
    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith("/apartments");
  });
});
