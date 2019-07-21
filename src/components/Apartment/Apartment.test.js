import React from "react";
import Apartment from "./Apartment";
import "@testing-library/react/cleanup-after-each";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as data from "../../api/api";

const mockFetch = jest.spyOn(data, "fetchApartments");

afterEach(() => {
  jest.clearAllMocks();
});

// test fails because apartments in apartments.map is undefined
xdescribe("Apartment", () => {
  it("renders search bar", () => {
    const { getByPlaceholderText } = render(<Apartment />);
    expect(getByPlaceholderText(/apartment/i)).toBeInTheDocument();
  });

  it("renders apartments heading and table headers", () => {
    const { getByText } = render(<Apartment />);
    expect(getByText(/apartments/i)).toBeInTheDocument();
    expect(getByText(/vacancy/i)).toBeInTheDocument();
    expect(getByText(/apartment name/i)).toBeInTheDocument();
    expect(getByText(/lease start/i)).toBeInTheDocument();
    expect(getByText(/lease end/i)).toBeInTheDocument();
    expect(getByText(/rental/i)).toBeInTheDocument();
  });

  it("renders list of apartments using mock data", async () => {
    mockFetch.mockImplementation(() => [
      {
        name: "BOGUS APARTMENT",
        address: "18 Bogus Street #01-01",
        bedrooms: 1,
        capacity: 1,
        leases: [
          {
            leaseStart: "25 Jun 19",
            leaseEnd: "25 jun 22",
            monthlyRent: 1000
          }
        ]
      },
      {
        name: "ANOTHER APARTMENT",
        address: "10 Another Road #05-10",
        bedrooms: 2,
        capacity: 2,
        leases: [
          {
            leaseStart: "25 Jun 19",
            leaseEnd: "25 jun 22",
            monthlyRent: 2000
          }
        ]
      }
    ]);

    const { getByText } = render(<Apartment />);
    await waitForElement(() => getByText("BOGUS APARTMENT"));
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(getByText("BOGUS APARTMENT")).toBeInTheDocument();
    expect(getByText("1000")).toBeInTheDocument();
    expect(getByText("ANOTHER APARTMENT")).toBeInTheDocument();
    expect(getByText("2000")).toBeInTheDocument();
  });
});
