import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DetailsCard from "./index";
import { mockApartment } from "../../../mocks/mockData";

describe("Details Card", () => {
  it("should render details card", () => {
    render(<DetailsCard dataTestId="detailsCard" apartment={mockApartment} />);

    expect(screen.getByTestId("detailsCard")).toBeInTheDocument();
  });

  it("should render detail card headings", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(screen.getByText(/address :/i)).toBeInTheDocument();
    expect(screen.getByText(/bedroom\(s\) :/i)).toBeInTheDocument();
    expect(screen.getByText(/country :/i)).toBeInTheDocument();
    expect(screen.getByText(/landlord name :/i)).toBeInTheDocument();
    expect(screen.getByText(/landlord a\/c no\. :/i)).toBeInTheDocument();
  });

  it("should render detail card property description", () => {
    render(<DetailsCard apartment={mockApartment} />);

    expect(screen.getByText("10 Another Road #05-10")).toBeInTheDocument();
    expect(screen.getByText("Jack")).toBeInTheDocument();
  });
});
