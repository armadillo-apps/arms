import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewOccupantForm from "./NewOccupantForm";

xdescribe("Input form", () => {
  it("should have input area for name", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText(/Name/i)).toBeInTheDocument();
  });

  it("should have input area for employee ID", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText(/Employee ID/i)).toBeInTheDocument();
  });

  it("should have input button to submit new occupant attributes", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText(/Create/i)).toBeInTheDocument();
  });

  it("should detect input for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("Name");

    fireEvent.change(nameInput, { target: { value: "Tim" } });

    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("Tim");
  });

  it("should detect input for employeeID field", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("Employee Id");

    fireEvent.change(nameInput, { target: { value: "sd123123123" } });

    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("sd123123123");
  });

  it("should detect input for remarks field", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("Remarks");

    fireEvent.change(nameInput, {
      target: { value: "He might need to extend stay by 2 months" }
    });
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("He might need to extend stay by 2 months");
  });

  it("should render a create button", () => {
    const { getByText } = render(<NewOccupantForm />);
    const createButton = getByText("Create");

    expect(createButton).toBeInTheDocument();
  });
});
