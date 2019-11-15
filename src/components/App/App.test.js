import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("App", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    const { getByText } = render(<App />);
    expect(getByText("User Login")).toBeInTheDocument();
  });

  it("renders Login page on load", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("loginForm")).toBeInTheDocument();
  });

  it("renders Dashboard if logged in", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => true);
    const { getByTestId } = render(<App />);
    expect(getByTestId("sideBar")).toBeInTheDocument();
  });
});
