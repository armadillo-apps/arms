import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders sidebar and Login page on load", () => {
    const { getByTestId, queryByTestId } = render(<App />);
    expect(getByTestId("sideBar")).toBeInTheDocument();
    expect(getByTestId("loginForm")).toBeInTheDocument();
  });
});
