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
    const { getByText } = render(
      <Apartment apartments={apartments} stays={[]} />
    );
    expect(getByText("Apartment Name")).toBeInTheDocument();
    expect(getByText("Parc Sophia")).toBeInTheDocument();
  });

  it("renders the monthly rent of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={apartments} stays={[]} />
    );
    expect(getByText("Rental Per Month")).toBeInTheDocument();
    expect(getByText("5000")).toBeInTheDocument();
  });

  it("renders the lease start of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={apartments} stays={[]} />
    );
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("25 June 2019")).toBeInTheDocument();
  });

  it("renders the lease end of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={apartments} stays={[]} />
    );
    expect(getByText("Lease End")).toBeInTheDocument();
    expect(getByText("24 June 2020")).toBeInTheDocument();
  });

  it("calculates vacancy of an apartment based on its capacity and current stays", () => {
    const today = new Date();
    const oneMonthFromToday = today.setMonth(today.getMonth() + 1);
    const twoMonthsFromToday = today.setMonth(today.getMonth() + 2);

    const stays = [ 
      {
        apartmentId: '123',
        checkInDate: new Date("2017-01-01"),
        checkOutDate: new Date("2017-12-01")
      },
      {
        apartmentId: '123',
        checkInDate: new Date("2018-01-01"),
        checkOutDate: oneMonthFromToday
      },
      {
        apartmentId: '123',
        checkInDate: oneMonthFromToday,
        checkOutDate: twoMonthsFromToday
      }
    ];

    const { getByText } = render(
      <Apartment apartments={apartments} stays={stays} />
    );
    expect(getByText("Vacancy")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
  });
});
