import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import ApartmentProfile2 from "./ApartmentProfile2";

describe("Apartment Profile2", () => {
  it("should render searchbar", () => {
    const { getByPlaceholderText } = render(<ApartmentProfile2 />);

    expect(getByPlaceholderText("Search here")).toBeInTheDocument();
  });

  it("should render apartment name", () => {
    const { getByText } = render(<ApartmentProfile2 />);

    expect(getByText("Parc Sophia Unit #01-01")).toBeInTheDocument();
  });

  it("should render Back button", () => {
    const { getByText } = render(<ApartmentProfile2 />);

    expect(getByText(/< Back to Apartment Listings/i)).toBeInTheDocument();
  });

  it("should render Edit button", () => {
    const { getByText } = render(<ApartmentProfile2 />);

    expect(getByText("EDIT")).toBeInTheDocument();
  });

  describe("Details Card", () => {
    it("should render details card", () => {
      const { getByTestId } = render(<ApartmentProfile2 />);

      expect(getByTestId("detailsCard")).toBeInTheDocument();
    });
  });

  describe("Remarks Card", () => {
    it("should render remarks card", () => {
      const { getByTestId } = render(<ApartmentProfile2 />);

      expect(getByTestId("remarksCard")).toBeInTheDocument();
    });
  });

  describe("Occupants Card", () => {
    it("should render occupants card", () => {
      const { getByTestId } = render(<ApartmentProfile2 />);

      expect(getByTestId("occupantsCard")).toBeInTheDocument();
    });
  });

  describe("Lease Card", () => {
    it("should render lease card", () => {
      const { getByTestId } = render(<ApartmentProfile2 />);

      expect(getByTestId("leaseCard")).toBeInTheDocument();
    });
  });
});
