import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import ApartmentProfile2 from "./ApartmentProfile2";
import { useApartmentData } from "../../hooks/useApartmentData";
import { mockApartment } from "../../mocks/mockData";

jest.mock("../../hooks/useApartmentData");

describe("Apartment Profile2", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApartmentData.mockReturnValue({ apartment: mockApartment });
  });

  it("should render searchbar", () => {
    render(<ApartmentProfile2 />);

    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
  });

  it("should render apartment name", async () => {
    render(<ApartmentProfile2 />);

    const apartmentName = await screen.findByText("Garden Shack");
    expect(apartmentName).toBeInTheDocument();
  });

  it("should render apartment status", () => {
    render(<ApartmentProfile2 />);

    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it("should render Back button", () => {
    render(<ApartmentProfile2 />);

    expect(
      screen.getByText(/< Back to Apartment Listings/i)
    ).toBeInTheDocument();
  });

  it("should render Edit button", () => {
    render(<ApartmentProfile2 />);

    expect(screen.getByText("EDIT")).toBeInTheDocument();
  });

  it("should render Details Card", () => {
    render(<ApartmentProfile2 />);

    expect(screen.getByTestId("detailsCard")).toBeInTheDocument();
  });

  describe("Vacancy Card", () => {
    it("should render vacancy card", () => {
      render(<ApartmentProfile2 />);

      expect(screen.getByTestId("vacancyCard")).toBeInTheDocument();
    });
  });

  describe("Remarks Card", () => {
    it("should render remarks card", () => {
      render(<ApartmentProfile2 />);

      expect(screen.getByTestId("remarksCard")).toBeInTheDocument();
    });
  });

  describe("Occupants Card", () => {
    it("should render occupants card", () => {
      render(<ApartmentProfile2 />);

      expect(screen.getByTestId("occupantsCard")).toBeInTheDocument();
    });

    it("should render occupants card headings", () => {
      render(<ApartmentProfile2 />);

      expect(screen.getByText(/^NAME/i)).toBeInTheDocument();
      expect(screen.getByText(/check-in/i)).toBeInTheDocument();
      expect(screen.getByText(/check-out/i)).toBeInTheDocument();
      expect(screen.getAllByText(/remarks/i)).toHaveLength(2);
    });
  });

  describe("Lease Card", () => {
    it("should render lease card", () => {
      render(<ApartmentProfile2 />);

      expect(screen.getByTestId("leaseCard")).toBeInTheDocument();
    });
  });
});