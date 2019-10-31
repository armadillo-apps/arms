import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Login Form", () => {
  it("should display the email and password input", () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });
});
