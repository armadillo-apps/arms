import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render, wait, act } from "@testing-library/react";
import OccupantProfile from "./OccupantProfile";
import * as data from "../../api/api";

const fetchStays = jest.spyOn(data, "fetchStays");

const occupantDetails = [
  {
    _id: "12345abc",
    name: "Tom",
    employeeId: "1234567a",
    remarks: "might extend stay",
    homeOffice: "Melbourne, Australia",
    gender: "male",
    status: "unallocated"
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
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText("< Back to Occupant Listings")).toBeInTheDocument();
  });

  it("should render occupant name as header", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText("Tom")).toBeInTheDocument();
  });

  it("should render occupant employeeId", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText("1234567a")).toBeInTheDocument();
  });

  it("should render occupant gender", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText(/gender/i)).toBeInTheDocument();
    expect(getByText(/male/i)).toBeInTheDocument();
  });

  it("should render occupant Home Office", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText(/Home Office/i)).toBeInTheDocument();
    expect(getByText(/Melbourne, Australia/i)).toBeInTheDocument();
  });

  it("should render stay history", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText("Stay History")).toBeInTheDocument();
  });

  it("should render occupant remarks", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("might extend stay")).toBeInTheDocument();
  });

  it("should render occupant status", () => {
    const { getByText } = render(
      <OccupantProfile
        occupants={occupantDetails}
        match={match}
        stays={[]}
        modalStates={modalStates}
      />
    );

    expect(getByText("unallocated")).toBeInTheDocument();
  });

  // skipped to suppress warnings for `not wrapped in act(...)` to fix, requires updating to React 16.9; https://github.com/testing-library/react-testing-library/issues/281#issuecomment-482718350

  describe("render the occupant staying history", () => {
    const modalStates = {
      success: true,
      message: "success"
    };

    const stays = [
      {
        _id: "123",
        apartment: {
          name: "Parc Sophia",
          leases: [
            {
              _id: "5d401557d855f9677f345692",
              leaseStart: "2008-10-25T00:00:00.000Z",
              leaseEnd: "2004-12-25T00:00:00.000Z",
              monthlyRent: "6000",
              currency: "THB"
            },
            {
              _id: "5d40fb0fe45a8c76d1061ebd",
              leaseStart: "2009-11-25T00:00:00.000Z",
              leaseEnd: "2003-11-25T00:00:00.000Z",
              monthlyRent: "7000",
              currency: "SGD"
            }
          ]
        },
        leaseId: "5d401557d855f9677f345692",
        checkInDate: "2009-12-25T00:00:00.000Z",
        checkOutDate: "2019-12-25T00:00:00.000Z"
      },
      {
        _id: "234",
        apartment: {
          name: "Parc El'Royale",
          leases: [
            {
              _id: "5d401557d855f9677f345692",
              leaseStart: "2002-9-25T00:00:00.000Z",
              leaseEnd: "2003-12-25T00:00:00.000Z",
              monthlyRent: "8000",
              currency: "SGD"
            },
            {
              _id: "5d40fb0fe45a8c76d1061ebd",
              leaseStart: "2009-11-25T00:00:00.000Z",
              leaseEnd: "2003-11-25T00:00:00.000Z",
              monthlyRent: "7000",
              currency: "SGD"
            }
          ]
        },
        leaseId: "5d401557d855f9677f345692",
        checkInDate: "2002-12-25T00:00:00.000Z",
        checkOutDate: "2003-12-25T00:00:00.000Z"
      },
      {
        _id: "456",
        checkInDate: "2001-12-25T00:00:00.000Z",
        checkOutDate: "2004-12-25T00:00:00.000Z",
        apartment: {
          name: "The Beacon Condo",
          leases: [
            {
              _id: "5d401557d855f9677f345693",
              leaseStart: "2008-10-25T00:00:00.000Z",
              leaseEnd: "2004-12-25T00:00:00.000Z",
              monthlyRent: "6000",
              currency: "SGD"
            },
            {
              _id: "5d40fb0fe45a8c76d1061eb4",
              leaseStart: "2009-11-25T00:00:00.000Z",
              leaseEnd: "2003-11-25T00:00:00.000Z",
              monthlyRent: "7000",
              currency: "THB"
            }
          ]
        }
        // leaseId: "5d401557d855f9677f345693"
      }
    ];

    it("should render stay history headers", () => {
      const { getByText } = render(
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          modalStates={modalStates}
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
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          modalStates={modalStates}
        />
      );

      await wait(() => {
        expect(getByText("Parc Sophia")).toBeInTheDocument();
        expect(getByText("The Beacon Condo")).toBeInTheDocument();
      });
    });

    it("should render occupant's check-in and check-out dates", async () => {
      fetchStays.mockResolvedValue(stays);

      const { getByText } = render(
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          modalStates={modalStates}
        />
      );

      await wait(() => {
        expect(getByText("25 Dec 09")).toBeInTheDocument();
        expect(getByText("25 Dec 19")).toBeInTheDocument();
        expect(getByText("25 Dec 01")).toBeInTheDocument();
        expect(getByText("25 Dec 02")).toBeInTheDocument();
      });
    });

    it("should render occupant's monthly rent", async () => {
      fetchStays.mockResolvedValue(stays);

      const { getByText } = render(
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          modalStates={modalStates}
        />
      );

      await wait(() => {
        expect(getByText("THB 6,000.00")).toBeInTheDocument();
        expect(getByText("SGD 8,000.00")).toBeInTheDocument();
      });
    });

    it("should display rent or error message if lease not allocated", async () => {
      fetchStays.mockResolvedValue(stays);

      const { getByText } = render(
        <OccupantProfile
          occupants={occupantDetails}
          match={match}
          modalStates={modalStates}
        />
      );

      await wait(() => {
        expect(getByText("Lease not allocated")).toBeInTheDocument();
      });
    });

    it("should render Loading.. if there are no occupants", () => {
      act(() => {
        const { getByText } = render(
          <OccupantProfile match={match} modalStates={modalStates} />
        );

        expect(getByText("Loading...")).toBeInTheDocument();
      });
    });
  });
});
