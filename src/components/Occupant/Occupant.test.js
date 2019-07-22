import React from "react";
import Occupant from "./Occupant";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

const occupants = [
  {
    name: "Bob",
    employeeId: "1234561b"
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
});
