import React from "react";
import UserManagement from "./UserManagement";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import * as data from "../../api/api";

const mockFetchUsers = jest.spyOn(data, "fetchUsers");
const mockRemoveUser = jest.spyOn(data, "removeUser");

const users = [
  {
    name: "Bob",
    email: "bob@thoughtworks.com",
    role: "admin",
    _id: "1234"
  }
];

describe("User Management Page", () => {
  it("should render table heading", () => {
    const { getByText } = render(<UserManagement />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Role")).toBeInTheDocument();
  });

  it("should render name of user", async () => {
    mockFetchUsers.mockReturnValueOnce(users);
    const { getByText } = render(<UserManagement />);
    const name = await waitForElement(() => getByText("Bob"));
    expect(name).toBeInTheDocument();
  });

  describe("delete user function", () => {
    it("should have a delete button", async () => {
      mockFetchUsers.mockReturnValueOnce(users);
      const { getByText } = render(<UserManagement />);
      const deleteButton = await waitForElement(() => getByText("Delete"));
      expect(deleteButton).toBeInTheDocument();
    });

    it("should be able to delete a user", async () => {
      mockFetchUsers.mockReturnValueOnce(users);
      mockRemoveUser.mockReturnValueOnce([]);
      const { getByText, queryByText } = render(<UserManagement />);
      const deleteButton = await waitForElement(() => getByText("Delete"));
      fireEvent.click(deleteButton);
      const deletedUser = await waitForElement(() => queryByText("Bob"));
      expect(deletedUser).not.toBeInTheDocument();
    });
  });
});
