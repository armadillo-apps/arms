import React from "react";

import { ToastProvider } from "react-toast-notifications";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { mockUserContext } from "../../../test/utils/mockUserContext";
import "@testing-library/jest-dom/extend-expect";
import * as data from "../../api/api";
import ChangePasswordForm from "./ChangePasswordForm";

const mockPost = jest.spyOn(data, "updatePassword");
const triggerRender = jest.fn();

const user = { email: "user@email.com" };
mockUserContext(user);

const ChangePasswordFormWithContext = (
  <ToastProvider>
    <ChangePasswordForm triggerRender={triggerRender} />
  </ToastProvider>
);

describe("Change Password Form", () => {
  describe("input boxes", () => {
    it("should render input box for existing and new password", () => {
      const { getByLabelText } = render(ChangePasswordFormWithContext);
      expect(getByLabelText("Existing Password*")).toBeInTheDocument();
      expect(getByLabelText("New Password*")).toBeInTheDocument();
    });
  });

  describe("should be able to fill in input box", () => {
    it("should be able to enter existing password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        ChangePasswordFormWithContext
      );
      const password = getByLabelText("Existing Password*");
      fireEvent.change(password, { target: { value: "password1234" } });
      expect(getByDisplayValue("password1234")).toBeInTheDocument();
    });

    it("should be able to enter new password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        ChangePasswordFormWithContext
      );
      const newPassword = getByLabelText("New Password*");
      fireEvent.change(newPassword, { target: { value: "password4321" } });
      expect(getByDisplayValue("password4321")).toBeInTheDocument();
    });
  });

  describe("Toggle password reveal", () => {
    it("should toggle password reveal for existing password only", () => {
      const { getByLabelText, getByTestId } = render(
        ChangePasswordFormWithContext
      );
      const passwordInput = getByLabelText("Existing Password*");
      const newPasswordInput = getByLabelText("New Password*");
      fireEvent.change(passwordInput, {
        target: { value: "password1234" }
      });
      expect(passwordInput.type).toBe("password");

      const passwordToggleCheckbox = getByTestId("toggle-password");
      fireEvent.click(passwordToggleCheckbox);
      expect(passwordInput.type).toBe("text");
      expect(newPasswordInput.type).toBe("password");
    });

    it("should toggle password reveal for new password only", () => {
      const { getByLabelText, getByTestId } = render(
        ChangePasswordFormWithContext
      );
      const passwordInput = getByLabelText("Existing Password*");
      const newPasswordInput = getByLabelText("New Password*");
      fireEvent.change(newPasswordInput, {
        target: { value: "newPassword1234" }
      });
      expect(newPasswordInput.type).toBe("password");

      const newPasswordToggleCheckbox = getByTestId("toggle-newPassword");
      fireEvent.click(newPasswordToggleCheckbox);
      expect(passwordInput.type).toBe("password");
      expect(newPasswordInput.type).toBe("text");
    });
  });

  describe("Confirmation", () => {
    it("should render a Submit button", () => {
      const { getByText } = render(ChangePasswordFormWithContext);
      const submitButton = getByText("Submit");
      expect(submitButton).toBeInTheDocument();
    });

    it("should clear all input values when Submit button is clicked", async () => {
      const mockGetUserId = jest.spyOn(data, "getUserId");
      mockGetUserId.mockReturnValueOnce({ id: "123" });

      mockPost.mockReturnValueOnce("");

      const { getByText, getByLabelText } = render(
        ChangePasswordFormWithContext
      );
      const newPassword = getByLabelText("New Password*");
      fireEvent.change(newPassword, { target: { value: "newPassword123" } });

      const submitButton = getByText("Submit");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(newPassword.value).toBe("");
      });
    });
  });

  describe("Notification", () => {
    it("should show error notification", async () => {
      mockPost.mockRejectedValue({});

      const { getByText } = render(ChangePasswordFormWithContext);

      const submitButton = getByText("Submit");
      fireEvent.click(submitButton);

      const errorMessage = await waitFor(() =>
        getByText("Unable to change password")
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it("should show success notification", async () => {
      mockPost.mockReturnValue({});
      const { getByText } = render(ChangePasswordFormWithContext);

      const submitButton = getByText("Submit");
      fireEvent.click(submitButton);

      const successMessage = await waitFor(() => getByText("Success"));

      expect(successMessage).toBeInTheDocument();
    });
  });
});
