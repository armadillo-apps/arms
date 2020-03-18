import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import LoginForm from "./LoginForm";
import * as data from "../../api/api";

const postSpy = jest.spyOn(data, "loginUser");

describe("Login Form", () => {
  it("should have Login title on page ", () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText("User Login")).toBeInTheDocument();
  });

  it("should display the email and password input", () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should display a login button", () => {
    const { getByText } = render(<LoginForm />);
    expect(
      getByText("Login", { selector: "input[type=submit]" })
    ).toBeInTheDocument();
  });

  it("should fill in the login credentials", () => {
    const handleEmailChange = jest.fn();
    const { getByLabelText } = render(
      <LoginForm handleEmailChange={handleEmailChange} />
    );
    const userEmail = getByLabelText("Email");
    fireEvent.change(userEmail, {
      target: { value: "elson@thoughtworks.com" }
    });

    const userPassword = getByLabelText("Password");
    fireEvent.change(userPassword, { target: { value: "pass1234" } });

    expect(userEmail.value).toBe("elson@thoughtworks.com");
    expect(userPassword.value).toBe("pass1234");
  });

  describe("Confirmation message", () => {
    it("should display an error message when user is logged in", async () => {
      postSpy.mockReturnValueOnce("Invalid email or password");

      const checkIsLoggedIn = () => {};
      const triggerRender = () => {};

      const { getByText } = render(
        <LoginForm
          triggerRender={triggerRender}
          checkIsLoggedIn={checkIsLoggedIn}
        />
      );

      const button = getByText("Login", { selector: "input[type=submit]" });
      fireEvent.click(button);

      const loginErrorMessage = await waitForElement(() =>
        getByText("Invalid email or password")
      );

      expect(loginErrorMessage).toBeInTheDocument();
    });
  });
});
