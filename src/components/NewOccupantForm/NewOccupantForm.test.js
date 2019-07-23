import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewOccupantForm from "./NewOccupantForm";
import * as api from "../../api/api";

const mockPost = jest.spyOn(api, "createNewOccupant");

mockPost.mockResolvedValue(() => "Success!");

afterEach(() => {
  jest.clearAllMocks();
});

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
    const { getByLabelText } = render(<NewOccupantForm />);

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
});

describe("Confirmation message", () => {
  it("should clear input text when submit button is clicked", async () => {
    const addNewOccupant = () => Promise.resolve();

    const { getByText, getByLabelText } = render(
      <NewOccupantForm addNewOccupant={addNewOccupant} />
    );

    const name = getByLabelText("Name");
    fireEvent.change(name, { target: { value: "Bob" } });

    const employeeId = getByLabelText("Employee ID");
    fireEvent.change(employeeId, { target: { value: "123" } });

    const remarks = getByLabelText("Remarks");
    fireEvent.change(remarks, { target: { value: "testing" } });

    const submitButton = getByText("Create");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await wait(() => {
      expect(name.value).toBe("");
      expect(employeeId.value).toBe("");
      expect(remarks.value).toBe("");
    });
  });

  it("should clear form after hitting submit", async () => {
    const addNewOccupant = () => Promise.resolve();

    const { getByLabelText, getByText } = render(
      <NewOccupantForm addNewOccupant={addNewOccupant} />
    );

    const nameInput = getByLabelText(/name/i);
    const button = getByText("Create", { selector: "button" });

    fireEvent.change(nameInput, { target: { value: "James Corden" } });
    fireEvent.click(button);

    await wait(() => {
      expect(nameInput.value).toEqual("");
    });
  });

  it("should display confirmation message on creation", async () => {
    const addNewOccupant = () =>
      Promise.resolve("Successfully added new occupant: James Corden");

    const { getByLabelText, getByText } = render(
      <NewOccupantForm addNewOccupant={addNewOccupant} />
    );

    const nameInput = getByLabelText(/name/i);
    const button = getByText("Create", { selector: "button" });

    fireEvent.change(nameInput, { target: { value: "James Corden" } });
    fireEvent.click(button);

    const successMessage = await waitForElement(() =>
      getByText("Successfully added new occupant: James Corden")
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("should display failure message when there is an error", async () => {
    const addNewOccupant = () => Promise.reject();

    const { getByLabelText, getByText } = render(
      <NewOccupantForm addNewOccupant={addNewOccupant} />
    );

    const nameInput = getByLabelText(/name/i);
    const button = getByText("Create", { selector: "button" });

    fireEvent.change(nameInput, { target: { value: "James Corden" } });
    fireEvent.click(button);

    const failureMessage = await waitForElement(() =>
      getByText("Unable to create new occupant :(")
    );

    expect(failureMessage).toBeInTheDocument();
  });
});
