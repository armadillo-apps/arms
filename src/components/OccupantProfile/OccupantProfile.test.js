import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render, wait, waitForElement } from "@testing-library/react";
import OccupantProfile from "./OccupantProfile";
import * as data from "../../api/api";

const fetchStays = jest.spyOn(data, "fetchStays");

const occupantDetails = [
  {
    _id: "12345abc",
    name: "Tom",
    employeeId: "1234567a",
    remarks: "might extend stay",
    country: "thailand",
    gender: "male",
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
  let match, modalStates;

  beforeEach(() => {
    match = {
      params: { occupantId: "12345abc" },
      isExact: true,
      path: "",
      url: ""
    };
    modalStates = {
      success: true,
      message: "success"
    };
  });

  it("should render a back button", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates}/>
    );

    expect(getByText("< Back")).toBeInTheDocument();
  });

  it("should render occupant name as header", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText("Tom")).toBeInTheDocument();
  });

  it("should render occupant employeeId", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText("1234567a")).toBeInTheDocument();
  });

  it("should render occupant gender", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText(/gender/i)).toBeInTheDocument();
    expect(getByText(/male/i)).toBeInTheDocument();
  });

  it("should render occupant country", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText(/country/i)).toBeInTheDocument();
    expect(getByText(/thailand/i)).toBeInTheDocument();
  });

  it("should render stay history", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText("Stay History")).toBeInTheDocument();
  });

  it("should render occupant remarks", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("might extend stay")).toBeInTheDocument();
  });

  it("should render occupant status", () => {
    const { getByText } = render(
      <OccupantProfile occupants={occupantDetails} match={match} stays={[]} modalStates={modalStates} />
    );

    expect(getByText("unallocated")).toBeInTheDocument();
  });

  // skipped to suppress warnings for `not wrapped in act(...)` to fix, requires updating to React 16.9; https://github.com/testing-library/react-testing-library/issues/281#issuecomment-482718350
  
  describe.skip("render the occupant staying history", () => {
    const stays = [
      {
        _id: "123",
        apartment: {
          name: "Parc Sophia"
        },
        checkInDate: "2009-12-25T00:00:00.000Z",
        checkOutDate: "2019-12-25T00:00:00.000Z"
      },
      {
        _id: "456",
        checkInDate: "2001-12-25T00:00:00.000Z",
        checkOutDate: "2002-12-25T00:00:00.000Z",
        apartment: {
          name: "The Beacon Condo"
        }
      }
    ];

    it("should render stay history headers", () => {
      const { getByText } = render(
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          stays={stays}
        />
      );

      expect(getByText("Apartment Name")).toBeInTheDocument();
      expect(getByText("Check In")).toBeInTheDocument();
      expect(getByText("Check Out")).toBeInTheDocument();
      expect(getByText("Monthly Rental")).toBeInTheDocument();
      expect(getByText("Remarks")).toBeInTheDocument();
    });

    it("should render occupant's stay history with apartment name", async () => {
      fetchStays.mockResolvedValue(stays);

      const { getByText } = render(
        <OccupantProfile occupants={occupantDetails} match={match} />
      );

      await wait(() => {
        expect(getByText("Parc Sophia")).toBeInTheDocument();
        expect(getByText("The Beacon Condo")).toBeInTheDocument();
      });
    });

    it("should render occupant's check-in and check-out dates", async () => {
      fetchStays.mockResolvedValue(stays);

      const { getByText } = render(
        <OccupantProfile occupants={occupantDetails} match={match} />
      );

      await wait(() => {
        expect(getByText("25 Dec 09")).toBeInTheDocument();
        expect(getByText("25 Dec 19")).toBeInTheDocument();
        expect(getByText("25 Dec 01")).toBeInTheDocument();
        expect(getByText("25 Dec 02")).toBeInTheDocument();
      });
    });
  });
});
