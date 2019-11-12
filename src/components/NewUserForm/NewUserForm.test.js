import React from "react";
import NewUserForm from "./NewUserForm";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "createNewUser");

describe("New User Form", () => {
  describe("input boxes", () => {
    it("should render an input box for name", () => {
      const { getByLabelText } = render(<NewUserForm />);
      expect(getByLabelText("Name*")).toBeInTheDocument();
    });

    it("should render an input box for email", () => {
      const { getByLabelText } = render(<NewUserForm />);
      expect(getByLabelText("Email*")).toBeInTheDocument();
    });

    it("should render an input box for password", () => {
      const { getByLabelText } = render(<NewUserForm />);
      expect(getByLabelText("Password*")).toBeInTheDocument();
    });

    it("should render a dropdown selector for role", () => {
      const { getByLabelText } = render(<NewUserForm />);
      expect(getByLabelText("User Role")).toBeInTheDocument();
    });
  });

  describe("should be able to fill in input box", () => {
    it("should be able to enter name", () => {
      const { getByLabelText, getByDisplayValue } = render(<NewUserForm />);
      const name = getByLabelText("Name*");
      fireEvent.change(name, { target: { value: "Bob" } });
      expect(getByDisplayValue("Bob")).toBeInTheDocument();
    });

    it("should be able to enter email", () => {
      const { getByLabelText, getByDisplayValue } = render(<NewUserForm />);
      const email = getByLabelText("Email*");
      fireEvent.change(email, {
        target: { value: "mrbob123@thoughtworks.com" }
      });
      expect(
        getByDisplayValue("mrbob123@thoughtworks.com")
      ).toBeInTheDocument();
    });

    it("should be able to enter password", () => {
      const { getByLabelText, getByDisplayValue } = render(<NewUserForm />);
      const password = getByLabelText("Password*");
      fireEvent.change(password, { target: { value: "passwordBob123" } });
      expect(getByDisplayValue("passwordBob123")).toBeInTheDocument();
    });

    it("should render a dropdown selector for role", () => {
      const { getByLabelText, getByDisplayValue } = render(<NewUserForm />);
      const role = getByLabelText("User Role");
      fireEvent.change(role, { target: { value: "manager" } });
      expect(getByDisplayValue("Manager")).toBeInTheDocument();
    });
  });
  describe("Confirmation", () => {
    it("should render a Create button", () => {
      const { getByText } = render(<NewUserForm />);
      const createButton = getByText("Create");
      expect(createButton).toBeInTheDocument();
    });

    it("should clear all input values when Create button is clicked", async () => {
      mockPost.mockReturnValueOnce("");
      const { getByText, getByLabelText } = render(<NewUserForm />);
      const name = getByLabelText("Name*");
      const email = getByLabelText("Email*");
      const password = getByLabelText("Password*");
      const role = getByLabelText("User Role");
      const createButton = getByText("Create");
      fireEvent.click(createButton);
      await wait(() => {
        expect(name.value).toBe("");
        expect(email.value).toBe("");
        expect(password.value).toBe("");
        expect(role.value).toBe("");
      });
    });
  });
});
