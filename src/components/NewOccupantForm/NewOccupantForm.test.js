import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewOccupantForm from "./NewOccupantForm";
import * as api from "../../api/api";

jest.spyOn(api, "createNewOccupant").mockResolvedValue(() => {});

describe("Input form", () => {
  it("should contain correct title", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText("Create New Occupant")).toBeInTheDocument();
  });

  it("should have input text for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Name")).toBeInTheDocument();
  });

  it("should have input text for employee id", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Employee ID")).toBeInTheDocument();
  });

  it("should have input text for remarks", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Remarks")).toBeInTheDocument();
  });

  it("should have text", () => {
    const { getByDisplayValue, getByLabelText } = render(<NewOccupantForm />);
    const name = getByLabelText("Name");
    fireEvent.change(name, { target: { value: "Bob" } });
    expect(getByDisplayValue("Bob")).toBeInTheDocument();
  });

  it("should fill up input text fields", () => {
    const { getByText, getByLabelText } = render(<NewOccupantForm />);

    const name = getByLabelText("Name");
    fireEvent.change(name, { target: { value: "Bob" } });

    const employeeId = getByLabelText("Employee ID");
    fireEvent.change(employeeId, { target: { value: "123" } });

    const remarks = getByLabelText("Remarks");
    fireEvent.change(remarks, { target: { value: "testing" } });

    expect(name.value).toBe("Bob");
    expect(employeeId.value).toBe("123");
    expect(remarks.value).toBe("testing");
  });

  it("should clear input text when submit button is clicked", async () => {
    const { getByText, getByLabelText } = render(<NewOccupantForm />);

    const name = getByLabelText("Name");
    fireEvent.change(name, { target: { value: "Bob" } });

    const employeeId = getByLabelText("Employee ID");
    fireEvent.change(employeeId, { target: { value: "123" } });

    const remarks = getByLabelText("Remarks");
    fireEvent.change(remarks, { target: { value: "testing" } });

    const submitButton = getByText("Create");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await waitForElement(() => getByLabelText("Name"));
    expect(name.value).toBe("");
    expect(employeeId.value).toBe("");
    expect(remarks.value).toBe("");
  });
});
