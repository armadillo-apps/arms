import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./index";
import routes from "../../../router/RouterPaths";
import { mockApartment } from "../../../mocks/mockData";

const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

describe("Header", () => {
  it("should render apartment name", async () => {
    render(<Header apartment={mockApartment} />);

    const apartmentName = await screen.findByText("Garden Shack");
    expect(apartmentName).toBeInTheDocument();
  });

  it("should render apartment status", () => {
    render(<Header apartment={mockApartment} />);

    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it("should render Back button", () => {
    render(<Header apartment={mockApartment} />);

    const backButton = screen.getByRole("button", { name: /< Back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(routes.APARTMENTS);
  });

  it("should render Edit button", () => {
    render(<Header apartment={mockApartment} />);

    expect(screen.getByText("EDIT")).toBeInTheDocument();
  });
});
