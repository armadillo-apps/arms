import React from "react";
import Apartment from "./Apartment";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const apartments = [
  {
    _id: "123",
    name: "Parc Sophia",
    address: "18 Bogus Street #01-01",
    bedrooms: 1,
    capacity: 10,
    leases: [
      {
        leaseStart: "25 June 2019",
        leaseEnd: "24 June 2020",
        monthlyRent: 5000
      }
    ]
  }
];

describe("Apartment", () => {
  it("renders the name of the apartment", () => {
    const { getByText } = render(<Apartment apartments={apartments} />);
    expect(getByText("Apartment Name")).toBeInTheDocument();
    expect(getByText("Parc Sophia")).toBeInTheDocument();
  });

  it("renders the monthly rent of the apartment", () => {
    const { getByText } = render(<Apartment apartments={apartments} />);
    expect(getByText("Rental Per Month")).toBeInTheDocument();
    expect(getByText("5000")).toBeInTheDocument();
  });

  it("renders the lease start of the apartment", () => {
    const { getByText } = render(<Apartment apartments={apartments} />);
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("25 June 2019")).toBeInTheDocument();
  });

  it("renders the lease end of the apartment", () => {
    const { getByText } = render(<Apartment apartments={apartments} />);
    expect(getByText("Lease End")).toBeInTheDocument();
    expect(getByText("24 June 2020")).toBeInTheDocument();
  });

  it("renders the vacancy of the apartment", () => {
    const { getByText } = render(<Apartment apartments={apartments} />);
    expect(getByText("Vacancy")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });
});
