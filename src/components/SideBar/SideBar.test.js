import React from "react";
import SideBar from "./SideBar";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

it("renders four links", () => {
  const { getByText } = render(
    <Router>
      <SideBar />
    </Router>
  );
  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(getByText(/new apartment/i)).toBeInTheDocument();
  expect(getByText(/new occupant/i)).toBeInTheDocument();
});
