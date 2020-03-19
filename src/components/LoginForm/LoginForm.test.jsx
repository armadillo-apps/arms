import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import LoginForm from "./LoginForm";
import * as data from "../../api/api";

const postSpy = jest.spyOn(data, "loginUser");
const LoginFormWithContext = (
  <ToastProvider>
    <LoginForm />
  </ToastProvider>
);

describe("Login Form", () => {
  it("should have title on page ", () => {
    const { getByText } = render(LoginFormWithContext);
    expect(getByText("ARMS")).toBeInTheDocument();
  });

  it("should display the email and password input", () => {
    const { getByLabelText } = render(LoginFormWithContext);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should display a login button", () => {
    const { getByText } = render(LoginFormWithContext);
    expect(
      getByText("Login", { selector: "input[type=submit]" })
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

  describe("Notification", () => {
    it("should show error notification when user submits an invalid email or password", async () => {
      const { getByText, getByLabelText } = render(LoginFormWithContext);
      const userEmail = getByLabelText("email");
      fireEvent.change(userEmail, {
        target: { value: "invalid" }
      });
      const userPassword = getByLabelText("password");
      fireEvent.change(userPassword, { target: { value: "invalid" } });

      const loginButton = getByText("Login", {
        selector: "input[type=submit]"
      });
      fireEvent.click(loginButton);

      const loginErrorNotification = await waitForElement(() =>
        getByText("Invalid email or password")
      );

      expect(loginErrorNotification).toBeInTheDocument();
    });

    it("should show success notification when user successfully logs in", async () => {
      const { getByText } = render(LoginFormWithContext);
      postSpy.mockReturnValue({});

      const loginButton = getByText("Login", {
        selector: "input[type=submit]"
      });
      fireEvent.click(loginButton);

      const loginErrorMessage = await waitForElement(() =>
        getByText("Welcome back!")
      );

      expect(loginErrorMessage).toBeInTheDocument();
    });
  });
});
