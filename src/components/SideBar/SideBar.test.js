import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import SideBar from "./SideBar";

it("renders four links for guest role", () => {
  const { getByText } = render(
    <Router>
      <SideBar userRole="guest" />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});

it("renders seven links for admin role", () => {
  const { getByText } = render(
    <Router>
      <SideBar userRole="admin" />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(getByText(/user management/i)).toBeInTheDocument();
  expect(getByText(/new occupant/i)).toBeInTheDocument();
  expect(getByText(/new user/i)).toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});

it("renders five links for manager role", () => {
  const { getByText } = render(
    <Router>
      <SideBar userRole="manager" />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(getByText(/new occupant/i)).toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});
