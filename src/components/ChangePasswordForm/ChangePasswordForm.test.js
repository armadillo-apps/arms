import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import { render, fireEvent, wait } from "@testing-library/react";
import * as UserContext from "../../context/UserContext";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "updatePassword");

describe("Change Password Form", () => {
  describe("input boxes", () => {
    it("should render input box for existing and new password", () => {
      const { getByLabelText } = render(<ChangePasswordForm />);
      expect(getByLabelText("Existing Password*")).toBeInTheDocument();
      expect(getByLabelText("New Password*")).toBeInTheDocument();
    });
  });

  describe("should be able to fill in input box", () => {
    it("should be able to enter existing password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        <ChangePasswordForm />
      );
      const password = getByLabelText("Existing Password*");
      fireEvent.change(password, { target: { value: "password1234" } });
      expect(getByDisplayValue("password1234")).toBeInTheDocument();
    });

    it("should be able to enter new password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        <ChangePasswordForm />
      );
      const newPassword = getByLabelText("New Password*");
      fireEvent.change(newPassword, { target: { value: "password4321" } });
      expect(getByDisplayValue("password4321")).toBeInTheDocument();
    });
  });

  describe("Toggle password reveal", () => {
    it("should toggle password reveal for existing password only", () => {
      const { getByLabelText, getByTestId } = render(<ChangePasswordForm />);
      const passwordInput = getByLabelText("Existing Password*");
      const newPasswordInput = getByLabelText("New Password*");
      fireEvent.change(passwordInput, {
        target: { value: "password1234" }
      });
      expect(passwordInput.type).toBe("password");

      const passwordToggleCheckbox = getByTestId("showPassword");
      fireEvent.click(passwordToggleCheckbox);
      expect(passwordInput.type).toBe("text");
      expect(newPasswordInput.type).toBe("password");
    });

    it("should toggle password reveal for new password only", () => {
      const { getByLabelText, getByTestId } = render(<ChangePasswordForm />);
      const passwordInput = getByLabelText("Existing Password*");
      const newPasswordInput = getByLabelText("New Password*");
      fireEvent.change(newPasswordInput, {
        target: { value: "newPassword1234" }
      });
      expect(newPasswordInput.type).toBe("password");

      const newPasswordToggleCheckbox = getByTestId("showNewPassword");
      fireEvent.click(newPasswordToggleCheckbox);
      expect(passwordInput.type).toBe("password");
      expect(newPasswordInput.type).toBe("text");
    });
  });

  describe("Confirmation", () => {
    it("should render a Submit button", () => {
      const { getByText } = render(<ChangePasswordForm />);
      const submitButton = getByText("Submit");
      expect(submitButton).toBeInTheDocument();
    });

    it("should clear all input values when Submit button is clicked", async () => {
      const user = { email: "user@email.com" };

      jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
        state: { user }
      }));
      const mockGetUserId = jest.spyOn(data, "getUserId");
      mockGetUserId.mockReturnValueOnce({ id: "123" });

      mockPost.mockReturnValueOnce("");

      const { getByText, getByLabelText } = render(<ChangePasswordForm />);
      const newPassword = getByLabelText("New Password*");
      fireEvent.change(newPassword, { target: { value: "newPassword123" } });

      const submitButton = getByText("Submit");
      fireEvent.click(submitButton);

      await wait(() => {
        expect(newPassword.value).toBe("");
      });
    });
  });
});
