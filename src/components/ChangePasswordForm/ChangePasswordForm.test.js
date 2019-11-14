import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "updatePassword");

describe("Change Password Form", () => {
  describe("input boxes", () => {
    it("should render an input box for password", () => {
      const { getByLabelText } = render(<ChangePasswordForm />);
      expect(getByLabelText("New Password*")).toBeInTheDocument();
    });
  });

  describe("should be able to fill in input box", () => {
    it("should be able to enter password", () => {
      const { getByLabelText, getByDisplayValue } = render(
        <ChangePasswordForm />
      );
      const password = getByLabelText("New Password*");
      fireEvent.change(password, { target: { value: "password1234" } });
      expect(getByDisplayValue("password1234")).toBeInTheDocument();
    });
  });
  describe("Confirmation", () => {
    it("should render a Submit button", () => {
      const { getByText } = render(<ChangePasswordForm />);
      const submitButton = getByText("Submit");
      expect(submitButton).toBeInTheDocument();
    });

    it("should clear all input values when Submit button is clicked", async () => {
      mockPost.mockReturnValueOnce("");
      const { getByText, getByLabelText } = render(<ChangePasswordForm />);
      const password = getByLabelText("New Password*");
      const submitButton = getByText("Submit");
      fireEvent.click(submitButton);
      await wait(() => {
        expect(password.value).toBe("");
      });
    });
  });
});
