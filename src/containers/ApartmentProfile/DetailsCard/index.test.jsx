import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DetailsCard from "./index";
import { mockApartment } from "../../../mocks/mockData";

describe("Details Card", () => {
  it("should attach data-testid when passed as a prop details card", () => {
    render(<DetailsCard dataTestId="detailsCard" apartment={mockApartment} />);

    expect(screen.getByTestId("detailsCard")).toBeInTheDocument();
  });

  it("should render vacancy info", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(screen.getByTestId("vacancy")).toBeInTheDocument();
  });

  it("should render bedrooms info", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(
      screen.getByText(`${mockApartment.bedrooms} Bedrooms`)
    ).toBeInTheDocument();
  });

  it("should render landlord info", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(
      screen.getByText(`Landlord Name : ${mockApartment.landlord.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Landlord A/C No. : ${mockApartment.landlord.accountNumber}`
      )
    ).toBeInTheDocument();
  });

  it("should render address info", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(screen.getByText(`${mockApartment.address}`)).toBeInTheDocument();
  });

  it("should render country info", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(screen.getByText(`${mockApartment.country}`)).toBeInTheDocument();
  });
});
