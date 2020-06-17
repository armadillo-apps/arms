import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";

import { mockUserContext } from "../../../test/utils/mockUserContext";
import OccupantProfile from "./index";
import {
  guestUser,
  mockOccupantDetails,
  mockStays,
  modalStates
} from "../../mocks/mockData";
import { useFetchWithParam } from "../../hooks/useFetchWithParam";
import * as api from "../../api/api";

const mockHistory = jest.fn();
jest.mock("../../hooks/useFetchWithParam");
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory }),
  useParams: () => ({
    occupantId: mockOccupantDetails[0]._id
  })
}));

describe("Occupant profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUserContext(guestUser);
    useFetchWithParam.mockReturnValue({
      data: mockOccupantDetails[0],
      isFetching: false,
      isError: false
    });
  });

  it("should not render Edit button for guest users", () => {
    const { queryByText } = render(
      <OccupantProfile modalStates={modalStates} />
    );
    expect(queryByText("Edit")).not.toBeInTheDocument();
  });

  it("should render Edit button for non-guest users", () => {
    const adminUser = { email: "admin@email.com", role: "admin" };
    mockUserContext(adminUser);

    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);
    expect(getByText("Edit")).toBeInTheDocument();
  });

  it("should render a back button", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText("< Back to Occupant Listings")).toBeInTheDocument();
  });

  it("should render occupant name as header", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText("Tom")).toBeInTheDocument();
  });

  it("should render occupant employeeId", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText("1234567a")).toBeInTheDocument();
  });

  it("should render occupant gender", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText(/gender/i)).toBeInTheDocument();
    expect(getByText(/male/i)).toBeInTheDocument();
  });

  it("should render occupant Home Office", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText(/Home Office/i)).toBeInTheDocument();
    expect(getByText(/Melbourne, Australia/i)).toBeInTheDocument();
  });

  it("should render stay history", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText("Stay History")).toBeInTheDocument();
  });

  it("should render occupant remarks", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("might extend stay")).toBeInTheDocument();
  });

  it("should render occupant status", () => {
    const { getByText } = render(<OccupantProfile modalStates={modalStates} />);

    expect(getByText("unallocated")).toBeInTheDocument();
  });

  // skipped to suppress warnings for `not wrapped in act(...)` to fix, requires updating to React 16.9; https://github.com/testing-library/react-testing-library/issues/281#issuecomment-482718350

  describe("render the occupant staying history", () => {
    jest.spyOn(api, "fetchStays").mockReturnValue(mockStays);
    beforeEach(() => {
      jest.clearAllMocks();
      useFetchWithParam.mockReturnValue({
        data: mockOccupantDetails[0],
        isFetching: false,
        isError: false
      });
    });

    it("should render stay history headers", () => {
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );

      expect(getByText("Apartment Name")).toBeInTheDocument();
      expect(getByText("Check In")).toBeInTheDocument();
      expect(getByText("Check Out")).toBeInTheDocument();
      expect(getByText("Monthly Rental")).toBeInTheDocument();
      expect(getByText("Remarks")).toBeInTheDocument();
    });

    it("should render occupant's stay history with apartment name", async () => {
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );

      await waitFor(() => {
        expect(getByText("Parc Sophia")).toBeInTheDocument();
        expect(getByText("The Beacon Condo")).toBeInTheDocument();
      });
    });

    it("should render occupant's check-in and check-out dates", async () => {
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );

      await waitFor(() => {
        expect(getByText("25 Dec 09")).toBeInTheDocument();
        expect(getByText("25 Dec 19")).toBeInTheDocument();
        expect(getByText("25 Dec 01")).toBeInTheDocument();
        expect(getByText("25 Dec 02")).toBeInTheDocument();
      });
    });

    it("should render occupant's monthly rent", async () => {
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );

      await waitFor(() => {
        expect(getByText("THB 6,000.00")).toBeInTheDocument();
        expect(getByText("SGD 8,000.00")).toBeInTheDocument();
      });
    });

    it("should display rent or error message if lease not allocated", async () => {
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );

      await waitFor(() => {
        expect(getByText("Lease not allocated")).toBeInTheDocument();
      });
    });

    it("should render Loading.. if there are no occupants", async () => {
      useFetchWithParam.mockReturnValue({
        data: mockOccupantDetails[0],
        isFetching: true,
        isError: false
      });
      const { getByText } = render(
        <OccupantProfile modalStates={modalStates} />
      );
      await waitFor(() => {
        expect(getByText("Loading...")).toBeInTheDocument();
      });
    });
  });
});
