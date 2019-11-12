import React from "react";
import UserManagement from "./UserManagement";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";

const users = [
  {
    name: "Bob",
    email: "bob@thoughtworks.com",
    role: "admin",
    _id: "1234"
  },
  {
    name: "Ann",
    email: "ann@thoughtworks.com",
    role: "manager",
    _id: "12345"
  }
];

describe("User Management Page", () => {
  it("should render name of user", () => {
    const { getByText } = render(<UserManagement users={users} />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Bob")).toBeInTheDocument();
  });
});
