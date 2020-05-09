import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import EditOccupantForm from "./EditOccupantForm";

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
    homeOffice: "Australia, Brisbane",
    status: "unallocated"
  },
  {
    _id: "5d36b4ade2a0d50eff851285",
    name: "Tim",
    status: "inactive"
  }
];

describe("EditOccupantForm", () => {
  it("should contain correct title", () => {
    const { getByText } = render(<EditOccupantForm occupant={occupants[0]} />);
    expect(getByText("Edit Occupant")).toBeInTheDocument();
  });

  it("should have input field for Name", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Name")).toBeInTheDocument();
  });

  it("should have input field for employee id", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Employee ID")).toBeInTheDocument();
  });

  it("should have input field for gender", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Gender")).toBeInTheDocument();
  });

  it("should have input field for remarks", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Remarks")).toBeInTheDocument();
  });

  it("should have input field for Home Office", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Home Office")).toBeInTheDocument();
  });

  it("should have dropdown for status", () => {
    const { getByLabelText } = render(
      <EditOccupantForm occupant={occupants[0]} />
    );
    expect(getByLabelText("Occupant Status:")).toBeInTheDocument();
  });

  it("should have Update button", () => {
    const { getByText } = render(<EditOccupantForm occupant={occupants[0]} />);
    const updateButton = getByText("Update", {
      selector: "input[type=submit]"
    });

    expect(updateButton).toBeInTheDocument();
  });

  it("should have Cancel button", () => {
    const { getByText } = render(<EditOccupantForm occupant={occupants[0]} />);
    const cancelButton = getByText("Cancel");

    expect(cancelButton).toBeInTheDocument();
  });

  it("should render a confirmation message", () => {
    const { getByText } = render(
      <EditOccupantForm
        message="Successfully update new occupant: Bob"
        success={true}
        occupant={occupants[0]}
      />
    );

    expect(
      getByText("Successfully update new occupant: Bob")
    ).toBeInTheDocument();
  });

  it("should render country, city when Home office is selected", () => {
    const { getByText } = render(<EditOccupantForm occupant={occupants[1]} />);
    expect(getByText("Australia, Brisbane")).toBeInTheDocument();
  });
});
