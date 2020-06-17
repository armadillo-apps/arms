import React from "react";
import { render } from "@testing-library/react";
import { mockUserContext } from "../../../test/utils/mockUserContext";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import SideBar from "./SideBar";

it("renders four links for guest role", () => {
  const guestUser = { role: "guest" };
  mockUserContext(guestUser);

  const { getByText, queryByText } = render(
    <Router>
      <SideBar />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(queryByText(/user management/i)).not.toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});

it("renders six links for admin role", () => {
  const adminUser = { role: "admin" };
  mockUserContext(adminUser);

  const { getByText } = render(
    <Router>
      <SideBar />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(getByText(/user management/i)).toBeInTheDocument();
  expect(getByText(/new occupant/i)).toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});

it("renders five links for manager role", () => {
  const managerUser = { role: "manager" };
  mockUserContext(managerUser);

  const { getByText, queryByText } = render(
    <Router>
      <SideBar />
    </Router>
  );

  expect(getByText(/apartments/i)).toBeInTheDocument();
  expect(getByText(/occupants/i)).toBeInTheDocument();
  expect(queryByText(/user management/i)).not.toBeInTheDocument();
  expect(getByText(/new occupant/i)).toBeInTheDocument();
  expect(getByText(/change password/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
});
