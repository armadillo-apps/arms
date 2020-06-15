import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewOccupantForm from "./NewOccupantForm";
import * as data from "../../api/api";
import routes from "../../router/RouterPaths";

const mockPost = jest.spyOn(data, "createNewOccupant");
const mockHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

const NewOccupantFormWithContext = () => (
  <ToastProvider>
    <NewOccupantForm />
  </ToastProvider>
);

describe("NewOccupantForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Input form", () => {
    it("should contain correct title", () => {
      const { getByText } = render(<NewOccupantFormWithContext />);
      expect(getByText("Create New Occupant")).toBeInTheDocument();
    });

    it("should have input text for name", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText(/name/i)).toBeInTheDocument();
    });

    it("should have input text for employee id", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText("Employee ID")).toBeInTheDocument();
    });

    it("should have input text for gender", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText("Gender")).toBeInTheDocument();
    });

    it("should have input text for remarks", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText("Remarks")).toBeInTheDocument();
    });

    it("should have dropdown for Home Office", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText("Home Office")).toBeInTheDocument();
    });

    it("should have dropdown for status", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);
      expect(getByLabelText("Occupant Status*")).toBeInTheDocument();
    });

    it("should have text", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <NewOccupantFormWithContext />
      );
      const name = getByLabelText(/name/i);
      fireEvent.change(name, { target: { value: "Bob" } });
      expect(getByDisplayValue("Bob")).toBeInTheDocument();
    });

    it("should fill up input text fields", () => {
      const { getByLabelText } = render(<NewOccupantFormWithContext />);

      const name = getByLabelText(/name/i);
      fireEvent.change(name, { target: { value: "Bob" } });

      const employeeId = getByLabelText("Employee ID");
      fireEvent.change(employeeId, { target: { value: "123" } });

      const gender = getByLabelText("Gender");
      fireEvent.change(gender, { target: { value: "male" } });

      const remarks = getByLabelText("Remarks");
      fireEvent.change(remarks, { target: { value: "testing" } });

      const homeOffice = getByLabelText("Home Office");
      fireEvent.change(homeOffice, {
        target: { value: "Australia, Melbourne" }
      });

      const status = getByLabelText("Occupant Status*");
      fireEvent.change(status, { target: { value: "allocated" } });

      expect(name.value).toBe("Bob");
      expect(employeeId.value).toBe("123");
      expect(gender.value).toBe("male");
      expect(remarks.value).toBe("testing");
      expect(homeOffice.value).toBe("Australia, Melbourne");
      expect(status.value).toBe("allocated");
    });
  });

  describe("Confirmation message", () => {
    it("should clear input text when submit button is clicked", async () => {
      mockPost.mockReturnValueOnce("");
      const { getByText, getByLabelText } = render(
        <NewOccupantFormWithContext />
      );

      const name = getByLabelText(/name/i);
      fireEvent.change(name, { target: { value: "Bob" } });

      const employeeId = getByLabelText("Employee ID");
      fireEvent.change(employeeId, { target: { value: "123" } });

      const gender = getByLabelText("Gender");
      fireEvent.change(gender, { target: { value: "male" } });

      const remarks = getByLabelText("Remarks");
      fireEvent.change(remarks, { target: { value: "testing" } });

      const homeOffice = getByLabelText("Home Office");
      fireEvent.change(homeOffice, {
        target: { value: "Singapore, Singapore" }
      });

      const status = getByLabelText("Occupant Status*");
      fireEvent.change(status, { target: { value: "unallocated" } });

      const submitButton = getByText("Create", {
        selector: "input[type=submit]"
      });

      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(name.value).toBe("");
        expect(employeeId.value).toBe("");
        expect(gender.value).toBe("");
        expect(remarks.value).toBe("");
        expect(homeOffice.value).toBe("");
        expect(status.value).toBe("");
      });
    });

    it("should clear form after hitting submit", async () => {
      mockPost.mockReturnValueOnce("");
      const { getByLabelText, getByText } = render(
        <NewOccupantFormWithContext />
      );

      const nameInput = getByLabelText(/name/i);
      const button = getByText("Create", { selector: "input[type=submit]" });

      fireEvent.change(nameInput, { target: { value: "James Corden" } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(nameInput.value).toEqual("");
      });
    });

    it("should redirect to Occupants Page on creation", async () => {
      render(<NewOccupantFormWithContext />);

      const status = screen.getByLabelText("Occupant Status*");
      fireEvent.change(status, { target: { value: "allocated" } });
      const submitButton = screen.getByText("Create", {
        selector: "input[type=submit]"
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPost).toBeCalledTimes(1);
        expect(mockHistory).toBeCalledTimes(1);
        expect(mockHistory).toBeCalledWith(routes.OCCUPANTS);
      });
    });

    it("should display failure message when there is an error", async () => {
      mockPost.mockRejectedValue({});
      const { getByLabelText, getByText } = render(
        <NewOccupantFormWithContext />
      );

      const nameInput = getByLabelText(/name/i);
      const button = getByText("Create", { selector: "input[type=submit]" });

      fireEvent.change(nameInput, { target: { value: "James Corden" } });
      fireEvent.click(button);

      const failureMessage = await waitFor(() =>
        getByText("Unable to create new occupant :(")
      );

      expect(failureMessage).toBeInTheDocument();
    });

    it("should display success notification when there is no error", async () => {
      const successMessage = "Successfully added new occupant: James Corden";
      mockPost.mockReturnValue(successMessage);
      const { getByLabelText, getByText } = render(
        <NewOccupantFormWithContext />
      );

      const nameInput = getByLabelText(/name/i);
      const button = getByText("Create", { selector: "input[type=submit]" });

      fireEvent.change(nameInput, { target: { value: "James Corden" } });
      fireEvent.click(button);

      const notificationMessage = await waitFor(() =>
        getByText(successMessage)
      );

      expect(notificationMessage).toBeInTheDocument();
    });
  });
});
