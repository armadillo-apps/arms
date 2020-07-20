import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import * as data from "../../api/api";
import NewUserForm from "./NewUserForm";

const mockPost = jest.spyOn(data, "createNewUser");

const history = { push: jest.fn() };
const triggerRender = jest.fn();

const NewUserFormWithContext = (
  <ToastProvider>
    <NewUserForm history={history} triggerRender={triggerRender} />
  </ToastProvider>
);

describe("New User Form", () => {
  describe("input boxes", () => {
    it("should render an input box for name", () => {
      const { getByLabelText } = render(NewUserFormWithContext);
      expect(getByLabelText("Name*")).toBeInTheDocument();
    });

    it("should render an input box for email", () => {
      const { getByLabelText } = render(NewUserFormWithContext);
      expect(getByLabelText("Email*")).toBeInTheDocument();
    });

    it("should render an input box for password", () => {
      const { getByLabelText } = render(NewUserFormWithContext);
      expect(getByLabelText("Password*")).toBeInTheDocument();
    });

    it("should render a dropdown selector for role", () => {
      const { getByLabelText } = render(NewUserFormWithContext);
      expect(getByLabelText("User Role")).toBeInTheDocument();
    });
  });

  describe("should be able to fill in input box", () => {
    it("should be able to enter name", () => {
      const { getByLabelText, getByDisplayValue } = render(
        NewUserFormWithContext
      );
      const name = getByLabelText("Name*");
      fireEvent.change(name, { target: { value: "Bob" } });
      expect(getByDisplayValue("Bob")).toBeInTheDocument();
    });

    it("should be able to enter email", () => {
      const { getByLabelText, getByDisplayValue } = render(
        NewUserFormWithContext
      );
      const email = getByLabelText("Email*");
      fireEvent.change(email, {
        target: { value: "mrbob123@thoughtworks.com" }
      });
      expect(
        getByDisplayValue("mrbob123@thoughtworks.com")
      ).toBeInTheDocument();
    });

    it("should be able to enter password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        NewUserFormWithContext
      );
      const password = getByLabelText("Password*");
      fireEvent.change(password, { target: { value: "passwordBob123" } });
      expect(getByDisplayValue("passwordBob123")).toBeInTheDocument();
    });

    it("should toggle between showing and not showing password", () => {
      const { getByLabelText, getByTestId } = render(NewUserFormWithContext);
      const passwordInput = getByLabelText("Password*");
      fireEvent.change(passwordInput, { target: { value: "Passw0rd" } });
      expect(passwordInput.type).toBe("password");
      const passwordToggle = getByTestId("toggle-password");
      fireEvent.click(passwordToggle);
      expect(passwordInput.type).toBe("text");
    });

    it("should render a dropdown selector for role", () => {
      const { getByLabelText, getByDisplayValue } = render(
        NewUserFormWithContext
      );
      const role = getByLabelText("User Role");
      fireEvent.change(role, { target: { value: "manager" } });
      expect(getByDisplayValue(/manager/i)).toBeInTheDocument();
      fireEvent.change(role, { target: { value: "admin" } });
      expect(getByDisplayValue(/admin/i)).toBeInTheDocument();
      fireEvent.change(role, { target: { value: "guest" } });
      expect(getByDisplayValue(/guest/i)).toBeInTheDocument();
    });
  });
  describe("Confirmation", () => {
    it("should render a Create button", () => {
      const { getByText } = render(NewUserFormWithContext);
      const createButton = getByText("Create");
      expect(createButton).toBeInTheDocument();
    });

    it("should clear all input values when Create button is clicked", async () => {
      mockPost.mockReturnValueOnce({ success: true });
      const { getByText, getByLabelText } = render(NewUserFormWithContext);
      const name = getByLabelText("Name*");
      const email = getByLabelText("Email*");
      const password = getByLabelText("Password*");
      const role = getByLabelText("User Role");
      const createButton = getByText("Create");
      fireEvent.change(name, { target: { value: "Jane Doe" } });
      fireEvent.click(createButton);
      await waitFor(() => {
        expect(name.value).toBe("");
        expect(email.value).toBe("");
        expect(password.value).toBe("");
        expect(role.value).toBe("");
      });
    });

    it("should display failure message when there is an error", async () => {
      mockPost.mockReturnValueOnce({
        success: false,
        message: "Something went wrong"
      });
      const { getByText } = render(NewUserFormWithContext);

      const createButton = getByText("Create");
      fireEvent.click(createButton);

      const failureMessage = await waitFor(() =>
        getByText("Unable to create new user :( Something went wrong")
      );
      expect(failureMessage).toBeInTheDocument();
    });

    it("should display success message when there is no error", async () => {
      mockPost.mockReturnValue({
        success: true,
        message: "User created successfully"
      });

      const { getByText } = render(NewUserFormWithContext);

      const createButton = getByText("Create");
      fireEvent.click(createButton);

      const notificationMessage = await waitFor(() =>
        getByText("User created successfully")
      );
      expect(notificationMessage).toBeInTheDocument();
    });
  });
});
