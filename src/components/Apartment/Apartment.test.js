import React from "react";
import { Apartment } from "./Apartment";
import { render, fireEvent } from "@testing-library/react";
import { mockUserContext } from "../../../test/utils/mockUserContext";
import "@testing-library/jest-dom/extend-expect";
import { mockApartments } from "../../mocks/mockData";
import { sortApartmentsByStatus } from "./utils";

const user = {};
mockUserContext(user);

describe("Apartment", () => {
  it("renders the name of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Apartment Name")).toBeInTheDocument();
    expect(getByText("Parc Sophia")).toBeInTheDocument();
    expect(getByText("Sea View")).toBeInTheDocument();
  });

  it("renders the monthly rent of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Rental Per Month")).toBeInTheDocument();
    expect(getByText("THB 5,000.00")).toBeInTheDocument();
    expect(getByText("SGD 4,000.00")).toBeInTheDocument();
  });

  it("renders the lease start of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("25 June 2019")).toBeInTheDocument();
  });

  it("renders the lease end of the apartment", () => {
    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
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
        apartmentId: "123",
        checkInDate: new Date("2017-01-01"),
        checkOutDate: new Date("2017-12-01")
      },
      {
        apartmentId: "123",
        checkInDate: new Date("2018-01-01"),
        checkOutDate: oneMonthFromToday
      },
      {
        apartmentId: "123",
        checkInDate: oneMonthFromToday,
        checkOutDate: twoMonthsFromToday
      }
    ];

    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={stays} />
    );
    expect(getByText("Vacancy")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
  });

  it("should be able to filter apartments using searchbar correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );
    const inputField = getByPlaceholderText(/search apartment/i);
    const parcSophia = getByText("Parc Sophia");
    const seaView = getByText("Sea View");
    fireEvent.change(inputField, { target: { value: "p" } });
    expect(parcSophia).toBeInTheDocument();
    expect(seaView).not.toBeInTheDocument();
  });

  it("should return all apartments if searchbar is not used", () => {
    const { getByPlaceholderText, getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );
    const inputField = getByPlaceholderText(/search apartment/i);
    const startDateInput = getByPlaceholderText(/start date/i);
    const endDateInput = getByPlaceholderText(/end date/i);
    const sentosa = getByText("Sentosa Cove");
    const parcSophia = getByText("Parc Sophia");
    const seaView = getByText("Sea View");

    fireEvent.change(inputField, { target: { value: " " } });
    fireEvent.change(startDateInput, { target: { value: " " } });
    fireEvent.change(endDateInput, { target: { value: " " } });

    expect(sentosa).toBeInTheDocument();
    expect(parcSophia).toBeInTheDocument();
    expect(seaView).toBeInTheDocument();
  });

  it("should be able to filter apartments using date picker correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );

    const startDateInput = getByPlaceholderText(/start date/i);
    const endDateInput = getByPlaceholderText(/end date/i);
    const sentosa = getByText("Sentosa Cove");
    const parcSophia = getByText("Parc Sophia");
    const seaView = getByText("Sea View");

    fireEvent.change(startDateInput, { target: { value: "01/01/2021" } });
    fireEvent.change(endDateInput, { target: { value: "23/06/2021" } });

    expect(sentosa).not.toBeInTheDocument();
    expect(parcSophia).not.toBeInTheDocument();
    expect(seaView).toBeInTheDocument();
  });

  it("should redirect admin to create new apartment page on click", () => {
    const adminUser = { role: "admin" };
    mockUserContext(adminUser);

    const history = { push: jest.fn() };

    const { getByText } = render(
      <Apartment apartments={mockApartments} stays={[]} history={history} />
    );

    const addApartmentButton = getByText("+ Add Apartment");

    fireEvent.click(addApartmentButton);

    expect(history.push).toHaveBeenCalled();
  });

  it("should not show guest the link to create new apartment page", () => {
    const guestUser = { role: "guest" };
    mockUserContext(guestUser);

    const { queryByText } = render(
      <Apartment apartments={mockApartments} stays={[]} />
    );

    const addApartmentButton = queryByText("+ Add Apartment");

    expect(addApartmentButton).not.toBeInTheDocument();
  });

  describe("Sorting apartment", () => {
    it("should sort apartment by status and lease dates", () => {
      const sorted = sortApartmentsByStatus(mockApartments);
      expect(sorted[0].name).toBe("Parc Sophia");
      expect(sorted[1].name).toBe("Sea View");
      expect(sorted[2].name).toBe("Sentosa Cove");
    });
  });
});
