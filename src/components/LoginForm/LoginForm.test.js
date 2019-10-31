import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import LoginForm from "./LoginForm";

describe("Login Form", () => {
  const onLogin = jest.fn();
  let loginInput;

  beforeEach(() => {
    loginInput = {
      email: "elson@thoughtworks.com",
      password: "pass1234"
    };
  });

  const loginFunction = () => {
    return render(<LoginForm onLogin={onLogin} loginInput={input} />);
  };

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
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText("login")).toBeInTheDocument();
  });

  xit("should display successful message when user is logged in", async () => {
    const { getByLabelText, getByText } = loginFunction();

    const getEmailInput = getByLabelText("Email");
    const getPasswordInput = getByLabelText("Password");
    const getLoginButton = getByLabelText("login");

    fireEvent.click(getLoginButton);
    expect(onLogin).toBeCalledWith(loginInput);

    // const loginSuccessful = await waitForElement(() => {
    //   getByText("You are logged in");
    // });

    // expect(loginSuccessful).toBeInTheDocument();
  });
});
