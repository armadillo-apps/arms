import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  waitForElement
} from "@testing-library/react";
import ApartmentProfile from "./ApartmentProfile";
import * as data from "../../api/api";
import moment from "moment";

const apartmentDetails = [
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

const stayingHistory = [
  {
    _id: "67890123",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: "1 Feb 19",
    checkOutDate: "1 Mar 19",
    leaseId: "e83724nht8",
    occupantName: "John"
  },
  {
    _id: "67890124",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be1234",
    checkInDate: "1 Apr 19",
    checkOutDate: "1 May 19",
    leaseId: "e83724nht8",
    occupantName: "Tim"
  },
  {
    _id: "67890125",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80016be1324",
    checkInDate: "1 Apr 19",
    checkOutDate: moment(Date.now()).format("D-MMM-YY"),
    leaseId: "e83724nht8",
    occupantName: "Kai"
  }
];


const getApartmentProfileHistory = jest.spyOn(
  data,
  "getApartmentProfileHistory"
);

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

  it("should render field labels", () => {
    const { getByText } = render(
      <ApartmentProfile apartments={apartmentDetails} match={match} />
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

  it("should render the apartments details", () => {
    const { getByText } = render(
      <ApartmentProfile apartments={apartmentDetails} match={match} />
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

  it("should render a Back button", () => {
    const { getByText } = render(
      <ApartmentProfile apartments={apartmentDetails} match={match} />
    );

    expect(getByText("< Back")).toBeInTheDocument();
  });

  it("should render occupant history", async () => {
    getApartmentProfileHistory.mockReturnValueOnce(stayingHistory);
    const { getByText } = render(
      <ApartmentProfile apartments={apartmentDetails} match={match} />
    );
    const occupantName1 = await waitForElement(() => getByText("John"));
    const occupantName2 = await waitForElement(() => getByText("Tim"));
    const checkInDate1 = await waitForElement(() => getByText("1 Feb 19"));
    const checkOutDate2 = await waitForElement(() => getByText("1 May 19"));

    expect(occupantName1).toBeInTheDocument();
    expect(occupantName2).toBeInTheDocument();
    expect(checkInDate1).toBeInTheDocument();
    expect(checkOutDate2).toBeInTheDocument();
  });

  it("should render message when occupant history is empty", async () => {
    getApartmentProfileHistory.mockReturnValueOnce([]);
    const { getByText } = render(
      <ApartmentProfile apartments={apartmentDetails} match={match} />
    );
    const message = await waitForElement(() => getByText("No occupants yet!"));

    expect(message).toBeInTheDocument();
  });
});
