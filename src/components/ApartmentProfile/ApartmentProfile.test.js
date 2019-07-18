import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../App/App";
import * as data from "../../service/data";
import ApartmentProfile from "../ApartmentProfile/ApartmentProfile";

const mockFetch = jest.spyOn(data, "fetchApartments");

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
    leases: [{
      _id: "5555tyu",
      leaseStart: "25 Jun 19",
      leaseEnd: "25 Jun 22",
      monthlyRent: 1000

    }]}
];

afterEach(() => {
  jest.clearAllMocks();
});

describe("Apartment Profile", () => {
  mockFetch.mockImplementation(() => mockData);

  it("should route to apartment profile page after I click on an apartment and render apartment labels", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const apartmentListing = await waitForElement(() =>
      getByText(/fancy penthouse/i)
    );
    fireEvent.click(apartmentListing);

    expect(getByText(/address/i)).toBeInTheDocument();
    expect(getByText(/bedrooms/i)).toBeInTheDocument();
    expect(getByText(/capacity/i)).toBeInTheDocument();
    expect(getByText(/Occupants/)).toBeInTheDocument();
    expect(getByText(/leases/i)).toBeInTheDocument();
  });

  it("should render the apartments details on the apartment profile page, such as name, address, and any leases", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const apartmentListing = await waitForElement(() =>
      getByText(/fancy penthouse/i)
    );

    fireEvent.click(apartmentListing);

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
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const apartmentListing = await waitForElement(() =>
      getByText(/fancy penthouse/i)
    );
    fireEvent.click(apartmentListing);

    expect(getByText("< Back")).toBeInTheDocument();
  });
  it("should return to Apartments page when Back button is clicked", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    const apartmentListing = await waitForElement(() =>
      getByText(/fancy penthouse/i)
    );
    const backButton = await getByText("< Back")
    fireEvent.click(apartmentListing);
    fireEvent.click(backButton);

    expect(getByText("Apartments")).toBeInTheDocument();
  });
});
