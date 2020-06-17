import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import ApartmentProfile from "./index";
import { useApartmentData } from "../../hooks/useApartmentData";
import { mockApartment } from "../../mocks/mockData";

jest.mock("../../hooks/useApartmentData");
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useParams: () => jest.fn(),
  useHistory: () => ({ push: mockHistory })
}));

describe("Apartment Profile2", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApartmentData.mockReturnValue({ apartment: mockApartment });
  });

  it("should render searchbar", () => {
    render(<ApartmentProfile />);

    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
  });

  it("should render Header", () => {
    render(<ApartmentProfile />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render Details Card", () => {
    render(<ApartmentProfile />);

    expect(screen.getByTestId("detailsCard")).toBeInTheDocument();
  });

  describe("Remarks Card", () => {
    it("should render remarks card", () => {
      render(<ApartmentProfile />);

      expect(screen.getByTestId("remarksCard")).toBeInTheDocument();
    });
  });

  describe("Occupants Card", () => {
    it("should render occupants card", () => {
      render(<ApartmentProfile />);

      expect(screen.getByTestId("occupantsCard")).toBeInTheDocument();
    });

    it("should render occupants card headings", () => {
      render(<ApartmentProfile />);

      expect(screen.getByText(/^NAME/i)).toBeInTheDocument();
      expect(screen.getByText(/check-in/i)).toBeInTheDocument();
      expect(screen.getByText(/check-out/i)).toBeInTheDocument();
      expect(screen.getAllByText(/remarks/i)).toHaveLength(2);
    });
  });

  describe("Lease Card", () => {
    it("should render lease card", () => {
      render(<ApartmentProfile />);

      expect(screen.getByTestId("leaseCard")).toBeInTheDocument();
    });
  });
});
