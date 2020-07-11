import { render, screen } from "@testing-library/react";
import { mockApartment } from "../../../mocks/mockData";
import React from "react";
import OccupantsCard from "./index";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom");

describe("Occupants Card", () => {
  beforeEach(() => {
    useParams.mockReturnValue(mockApartment._id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should attach data-testid when passed as a prop details card", () => {
    render(
      <OccupantsCard dataTestId="occupantsCard" apartment={mockApartment} />
    );

    expect(screen.getByTestId("occupantsCard")).toBeInTheDocument();
  });
});
