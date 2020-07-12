import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { mockUserContext } from "../../../test/utils/mockUserContext";
import OccupantProfile from "./index";
import {
  guestUser,
  mockOccupantDetails,
  mockStays,
  modalStates
} from "../../mocks/mockData";
import { useFetch } from "../../hooks/useFetch";

const mockHistory = jest.fn();
jest.mock("../../hooks/useFetch");
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory }),
  useParams: () => ({
    occupantId: mockOccupantDetails[0]._id
  })
}));

describe("Occupant profile", () => {
  describe("Profile details", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockUserContext(guestUser);
      useFetch.mockReturnValueOnce({
        data: mockOccupantDetails[0],
        isFetching: false,
        isError: false
      });
      useFetch.mockReturnValueOnce({
        data: mockStays
      });
    });

    it("should not render Edit button for guest users", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    });

    it("should render Edit button for non-guest users", () => {
      const adminUser = { email: "admin@email.com", role: "admin" };
      mockUserContext(adminUser);

      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("should render a back button", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(
        screen.getByText("< Back to Occupant Listings")
      ).toBeInTheDocument();
    });

    it("should render occupant name as header", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Tom")).toBeInTheDocument();
    });

    it("should render occupant employeeId", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("1234567a")).toBeInTheDocument();
    });

    it("should render occupant gender", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText(/gender/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
    });

    it("should render occupant Home Office", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText(/Home Office/i)).toBeInTheDocument();
      expect(screen.getByText(/Melbourne, Australia/i)).toBeInTheDocument();
    });

    it("should render stay history", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Stay History")).toBeInTheDocument();
    });

    it("should render occupant remarks", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Remarks")).toBeInTheDocument();
      expect(screen.getByText("might extend stay")).toBeInTheDocument();
    });

    it("should render occupant status", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("unallocated")).toBeInTheDocument();
    });
  });

  describe("Stay history", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      useFetch.mockReturnValueOnce({
        data: mockOccupantDetails[0],
        isFetching: false,
        isError: false
      });
      useFetch.mockReturnValueOnce({
        data: mockStays
      });
    });

    it("should render stay history headers", () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Apartment Name")).toBeInTheDocument();
      expect(screen.getByText("Check In")).toBeInTheDocument();
      expect(screen.getByText("Check Out")).toBeInTheDocument();
      expect(screen.getByText("Monthly Rental")).toBeInTheDocument();
      expect(screen.getByText("Remarks")).toBeInTheDocument();
    });

    it("should render occupant's stay history with apartment name", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Parc Sophia")).toBeInTheDocument();
      expect(screen.getByText("The Beacon Condo")).toBeInTheDocument();
    });

    it("should render occupant's check-in and check-out dates", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("25 Dec 09")).toBeInTheDocument();
      expect(screen.getByText("25 Dec 19")).toBeInTheDocument();
      expect(screen.getByText("25 Dec 01")).toBeInTheDocument();
      expect(screen.getByText("25 Dec 02")).toBeInTheDocument();
    });

    it("should render occupant's monthly rent", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("THB 6,000.00")).toBeInTheDocument();
      expect(screen.getByText("SGD 8,000.00")).toBeInTheDocument();
    });

    it("should display rent or error message if lease not allocated", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Lease not allocated")).toBeInTheDocument();
    });
  });

  describe("Loading state", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      useFetch.mockReturnValue({
        data: {},
        isFetching: true,
        isError: false
      });
    });

    it("should render loading state when data is fetching", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      useFetch.mockReturnValue({
        data: {},
        isFetching: false,
        isError: true
      });
    });

    it("should show message when occupant could not be found", async () => {
      render(<OccupantProfile modalStates={modalStates} />);

      expect(screen.getByText("Could not find occupant")).toBeInTheDocument();
    });
  });
});
