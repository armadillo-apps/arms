import React from "react";
import Occupant from "./Occupant";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "fetchOccupants");

const occupants = [
  {
    _id: "5d36b4ade2a0d50eff851283",
    name: "Bob",
    employeeId: "1234561b",
    remarks: "testing for Bob",
    homeOffice: "Singapore, Singapore",
    status: "allocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851284",
    name: "Jason",
    status: "unallocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851285",
    name: "Tim",
    status: "inactive"
  }
];

describe("Occupant", () => {
  it("renders the name of occupant", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Bob")).toBeInTheDocument();
  });

  it("renders the employee ID of occupant", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Employee ID")).toBeInTheDocument();
    expect(getByText("1234561b")).toBeInTheDocument();
  });

  it("renders the remarks of occupant", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("testing for Bob")).toBeInTheDocument();
  });

  it("renders the status of occupant", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("allocated")).toBeInTheDocument();
    expect(getByText("unallocated")).toBeInTheDocument();
    expect(getByText("inactive")).toBeInTheDocument();
  });

  it("render row when employeeId is not present", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Jason")).toBeInTheDocument();
  });

  it("should attach allocated class to status ", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("allocated")).toHaveClass("allocated");
  });

  it("should attach unallocated class to status", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("unallocated")).toHaveClass("unallocated");
  });

  it("should attach inactive class to status", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("inactive")).toHaveClass("inactive");
  });

  it("should be able to filter occupants using searchbar correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Occupant occupants={occupants} />
    );
    const inputField = getByPlaceholderText(/search occupant/i);
    const bob = getByText("Bob");
    const jason = getByText("Jason");
    fireEvent.change(inputField, { target: { value: "b" } });
    expect(bob).toBeInTheDocument();
    expect(jason).not.toBeInTheDocument();
  });

  it("should redirect to Occupant Details Page on selection", async () => {
    const history = { push: jest.fn() };
    const triggerRender = jest.fn();
    mockPost.mockReturnValueOnce("");

    const { getByText } = render(
      <Occupant
        occupants={occupants}
        history={history}
        triggerRender={triggerRender}
      />
    );

    const occupantName = getByText("Bob");

    fireEvent.click(occupantName);

    await Promise.resolve();

    expect(history.push).toHaveBeenCalled();
  });
});
