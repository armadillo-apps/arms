import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { mockStayHistory } from "../../../mocks/mockData";
import React from "react";
import OccupantsCard from "./index";
import { formatDate } from "../../../utils/utils";
import { occupantsCardContent as content } from "../constants";

describe("Occupants Card", () => {
  it("should attach data-testid when passed as a prop details card", () => {
    render(<OccupantsCard dataTestId="occupantsCard" />);

    expect(screen.getByTestId("occupantsCard")).toBeInTheDocument();
  });

  it("should render title", () => {
    render(<OccupantsCard stayHistory={mockStayHistory} />);

    expect(screen.getByText(content.title)).toBeInTheDocument();
  });

  it("should render headings", () => {
    render(<OccupantsCard stayHistory={mockStayHistory} />);

    content.headings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("should render stay history of occupants", () => {
    render(<OccupantsCard stayHistory={mockStayHistory} />);

    mockStayHistory.forEach(stay => {
      expect(screen.getByText(`${stay.occupantName}`)).toBeInTheDocument();
      expect(
        screen.getByText(formatDate(stay.checkInDate))
      ).toBeInTheDocument();
      expect(
        screen.getByText(formatDate(stay.checkOutDate))
      ).toBeInTheDocument();
      expect(screen.getByText(`${stay.occupantRemarks}`)).toBeInTheDocument();
    });
  });

  it("should render no occupants message when stay history is empty", () => {
    render(<OccupantsCard />);

    expect(
      screen.queryByText(`${mockStayHistory[0].occupantName}`)
    ).not.toBeInTheDocument();
    expect(screen.getByText(content.emptyMessage)).toBeInTheDocument();
  });
});
