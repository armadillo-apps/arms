import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, getByText } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Login Form", () => {
  it("should display the login form", () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText("Hello User")).toBeInTheDocument();
  });
});
