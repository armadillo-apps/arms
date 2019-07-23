import React from "react";
import Occupant from "./Occupant";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

const occupants = [
  {
    _id: "5d36b4ade2a0d50eff851283",
    name: "Bob",
    employeeId: "1234561b"
  },
  {
    _id: "5d36b4ade2a0d50eff851284",
    name: "Jason"
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

  it("render row when employeeId", () => {
    const { getByText } = render(<Occupant occupants={occupants} />);
    expect(getByText("Jason")).toBeInTheDocument();
  });
});
