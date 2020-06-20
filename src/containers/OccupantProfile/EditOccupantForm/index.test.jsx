import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { ToastProvider } from "react-toast-notifications";
import { mockOccupants } from "../../../mocks/mockData";
import EditOccupantForm from "./index";

const EditOccupantFormWithProvider = (occupant, fetchData, closeModal) => (
  <ToastProvider>
    <EditOccupantForm
      occupant={occupant._id ?? mockOccupants[0]}
      fetchData={fetchData}
      closeModal={closeModal}
    />
  </ToastProvider>
);

describe("EditOccupantForm", () => {
  it("should contain correct title", () => {
    const { getByText } = render(<EditOccupantFormWithProvider />);
    expect(getByText("Edit Occupant")).toBeInTheDocument();
  });

  it("should have input field for Name", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Name")).toBeInTheDocument();
  });

  it("should have input field for employee id", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Employee ID")).toBeInTheDocument();
  });

  it("should have input field for gender", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Gender")).toBeInTheDocument();
  });

  it("should have input field for remarks", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Remarks")).toBeInTheDocument();
  });

  it("should have input field for Home Office", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Home Office")).toBeInTheDocument();
  });

  it("should have dropdown for status", () => {
    const { getByLabelText } = render(<EditOccupantFormWithProvider />);
    expect(getByLabelText("Occupant Status:")).toBeInTheDocument();
  });

  it("should have Update button", () => {
    const { getByText } = render(<EditOccupantFormWithProvider />);
    const updateButton = getByText("Update", {
      selector: "input[type=submit]"
    });

    expect(updateButton).toBeInTheDocument();
  });

  it("should have Cancel button", () => {
    const { getByText } = render(<EditOccupantFormWithProvider />);
    const cancelButton = getByText("Cancel");

    expect(cancelButton).toBeInTheDocument();
  });

  it("should render home office dropdown", () => {
    render(<EditOccupantFormWithProvider />);

    expect(screen.getByLabelText("Home Office")).toBeInTheDocument();
  });

  it("should render default values for input fields", async () => {
    render(<EditOccupantFormWithProvider />);

    expect(screen.getByDisplayValue(mockOccupants[0].name)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockOccupants[0].employeeId)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockOccupants[0].homeOffice)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockOccupants[0].remarks)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Allocated")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Male")).toBeInTheDocument();
  });
});
