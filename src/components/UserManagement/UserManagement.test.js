import React from "react";
import { ToastProvider } from "react-toast-notifications";
import UserManagement from "./UserManagement";
import {
  render,
  waitForElementToBeRemoved,
  waitFor,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import * as data from "../../api/api";

const mockFetchUsers = jest.spyOn(data, "fetchUsers");
const mockRemoveUser = jest.spyOn(data, "removeUser");
const mockEditUser = jest.spyOn(data, "editUserRole");

const history = { push: jest.fn() };

const UserManagementWithContext = (
  <ToastProvider>
    <UserManagement history={history} />
  </ToastProvider>
);

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
    const { getByText } = render(UserManagementWithContext);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Role")).toBeInTheDocument();
  });

  it("should redirect to create new user page on click", async () => {
    mockFetchUsers.mockReturnValueOnce(users);

    const { getByText } = render(UserManagementWithContext);

    const addUserButton = await waitFor(() => getByText("+ Add User"));
    expect(addUserButton).toBeInTheDocument();

    fireEvent.click(addUserButton);
    expect(history.push).toHaveBeenCalled();
  });

  it("should render name of user", async () => {
    mockFetchUsers.mockReturnValueOnce(users);
    const { getByText } = render(UserManagementWithContext);
    const name = await waitFor(() => getByText("Bob"));
    expect(name).toBeInTheDocument();
  });

  describe("delete user function", () => {
    it("should have a delete button", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      const { getByText } = render(UserManagementWithContext);
      const deleteButton = await waitFor(() => getByText("Delete"));
      expect(deleteButton).toBeInTheDocument();
    });

    it("should open up a modal when delete button is clicked", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      const { getByText } = render(UserManagementWithContext);
      const deleteButton = await waitFor(() => getByText("Delete"));
      fireEvent.click(deleteButton);
      const modalHeader = getByText(
        "Are you sure you want to delete this user?"
      );
      expect(modalHeader).toBeInTheDocument();
    });

    it("should close the modal when cancel button is clicked", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      const { getByText, queryByText } = render(UserManagementWithContext);
      const deleteButton = await waitFor(() => getByText("Delete"));
      fireEvent.click(deleteButton);
      const cancelButton = await waitFor(() => getByText("Cancel"));
      fireEvent.click(cancelButton);
      const modalHeader = queryByText(
        "Are you sure you want to delete this user?"
      );
      expect(modalHeader).not.toBeInTheDocument();
    });

    it("should delete the user when cancel button is clicked", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      mockRemoveUser.mockResolvedValueOnce([]);
      const { getByText, queryByText } = render(UserManagementWithContext);
      const deleteButton = await waitFor(() => getByText("Delete"));
      fireEvent.click(deleteButton);
      const modalDeleteButton = await waitFor(() => getByText("Confirm"));
      expect(modalDeleteButton).toBeInTheDocument();
      fireEvent.click(modalDeleteButton);
      await waitForElementToBeRemoved(() => getByText("Confirm"));
      const userToBeDeleted = queryByText("Bob");
      expect(userToBeDeleted).not.toBeInTheDocument();
    });
  });

  describe("edit user function", () => {
    it("should have a edit button", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      const { getByText } = render(UserManagementWithContext);
      const editButton = await waitFor(() => getByText("Edit Role"));
      expect(editButton).toBeInTheDocument();
    });

    it("should open up a modal when delete button is clicked", async () => {
      mockFetchUsers.mockResolvedValueOnce(users);
      const { getByText } = render(UserManagementWithContext);
      const editButton = await waitFor(() => getByText("Edit Role"));
      fireEvent.click(editButton);
      const modalHeader = getByText("Select a role for user:");
      expect(modalHeader).toBeInTheDocument();
    });
  });

  it("should close the modal when cancel button is clicked", async () => {
    mockFetchUsers.mockResolvedValueOnce(users);
    const { getByText, queryByText } = render(UserManagementWithContext);
    const editButton = await waitFor(() => getByText("Edit Role"));
    fireEvent.click(editButton);
    const cancelButton = await waitFor(() => getByText("Cancel"));
    fireEvent.click(cancelButton);
    const modalHeader = queryByText("Select a role for user:");
    expect(modalHeader).not.toBeInTheDocument();
  });

  it("should change the user's role when the confirm button is clicked", async () => {
    mockFetchUsers.mockResolvedValueOnce(users);
    mockRemoveUser.mockResolvedValueOnce([]);
    mockEditUser.mockResolvedValueOnce([]);

    const { getByText, getByTestId } = render(UserManagementWithContext);
    const editButton = await waitFor(() => getByText("Edit Role"));
    fireEvent.click(editButton);
    const modalHeader = getByText("Select a role for user:");
    expect(modalHeader).toBeInTheDocument();
    const roleSelector = getByTestId("roleSelector");
    fireEvent.change(roleSelector, { target: { value: "manager" } });
    const modalEditButton = await waitFor(() => getByText("Confirm"));
    expect(modalEditButton).toBeInTheDocument();
    fireEvent.click(modalEditButton);
    await waitForElementToBeRemoved(() => getByText("Confirm"));

    expect(mockEditUser).toHaveBeenCalledTimes(1);
    expect(mockEditUser).toHaveBeenCalledWith("1234", "manager");
  });
});
