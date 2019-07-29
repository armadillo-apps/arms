import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import OccupantProfile from "./OccupantProfile";

const occupantDetails = [
  {
    _id: "12345abc",
    name: "Tom",
    employeeId: "1234567a",
    remarks: "might extend stay",
    country: "Thailand",
    status: "unallocated"
  }
];

const stayingHistory = [
  {
    _id: "67890123",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: "1 Feb 19",
    checkOutDate: "1 Mar 19",
    leaseId: "e83724nht8",
    apartmentName: "Parc Sophia"
  }
];

describe("Occupant profile", () => {
  let match;

  beforeEach(() => {
    match = {
      params: { occupantId: "12345abc" },
      isExact: true,
      path: "",
      url: ""
    };
  });

  it("should render a back button", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("< Back")).toBeInTheDocument();
  });

  it("should render stay history", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("Stay History")).toBeInTheDocument();
  });

  it("should render occupant name as header", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("Tom")).toBeInTheDocument();
  });

  it("should render occupant employeeId", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("1234567a")).toBeInTheDocument();
  });

  it("should render occupant remarks", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("might extend stay")).toBeInTheDocument();
  });

  it("should render occupant status", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("unallocated")).toBeInTheDocument();
  });

  it("should render apartment headers", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} />
    );

    expect(getByText("Apartment Name")).toBeInTheDocument();
    expect(getByText("Check In")).toBeInTheDocument();
    expect(getByText("Check Out")).toBeInTheDocument();
    expect(getByText("Monthly Rental")).toBeInTheDocument();
    expect(getByText("Remarks")).toBeInTheDocument();
  });
});
