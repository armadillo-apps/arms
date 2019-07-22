import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import ApartmentProfile from "./ApartmentProfile";

const mockData = [
  {
    _id: "12345abc",
    name: "Fancy Penthouse",
    address: "18 Bogus Street #01-01",
    bedrooms: 1,
    capacity: 1,
    leases: [
      {
        _id: "5678tyu",
        leaseStart: "25 Jun 19",
        leaseEnd: "25 Jun 22",
        monthlyRent: 1000
      },
      {
        _id: "9872wer",
        leaseStart: "26 Jun 19",
        leaseEnd: "26 Jun 22",
        monthlyRent: 2000
      }
    ]
  },
  {
    _id: "67890def",
    name: "Garden Shack",
    address: "10 Another Road #05-10",
    bedrooms: 2,
    capacity: 2,
    leases: [
      {
        _id: "5555tyu",
        leaseStart: "25 Jun 19",
        leaseEnd: "25 Jun 22",
        monthlyRent: 1000
      }
    ]
  }
];

describe("Apartment Profile", () => {
  let match;

  beforeEach(() => {
    match = {
      params: { apartmentId: "12345abc" },
      isExact: true,
      path: "",
      url: ""
    };
  });

  afterEach(cleanup);

  it("should render field labels", async () => {
    const { getByText } = render(
      <ApartmentProfile apartments={mockData} match={match} />
    );

    expect(getByText("Address")).toBeInTheDocument();
    expect(getByText("Bedrooms")).toBeInTheDocument();
    expect(getByText("Capacity")).toBeInTheDocument();
    expect(getByText("No. of Occupants")).toBeInTheDocument();
    expect(getByText("Occupants")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Check-In")).toBeInTheDocument();
    expect(getByText("Check-Out")).toBeInTheDocument();
    expect(getByText("Leases")).toBeInTheDocument();
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("Lease End")).toBeInTheDocument();
    expect(getByText("Monthly Rent")).toBeInTheDocument();
  });

  it("should render the apartments details", async () => {
    const { getByText } = render(
      <ApartmentProfile apartments={mockData} match={match} />
    );

    expect(getByText(/fancy penthouse/i)).toBeInTheDocument();
    expect(getByText(/18 Bogus Street #01-01/i)).toBeInTheDocument();
    expect(getByText(/25 Jun 19/i)).toBeInTheDocument();
    expect(getByText(/25 Jun 22/i)).toBeInTheDocument();
    expect(getByText(/1000/i)).toBeInTheDocument();
    expect(getByText(/26 Jun 19/i)).toBeInTheDocument();
    expect(getByText(/26 Jun 22/i)).toBeInTheDocument();
    expect(getByText(/2000/i)).toBeInTheDocument();
  });

  it("should render a Back button", async () => {
    const { getByText } = render(
      <ApartmentProfile apartments={mockData} match={match} />
    );

    expect(getByText("< Back")).toBeInTheDocument();
  });
});
