import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import ApartmentProfile from "./index";
import { mockApartment, mockStayHistory } from "../../mocks/mockData";
import { useFetch } from "../../hooks/useFetch";

jest.mock("../../hooks/useFetch");

const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useParams: () => jest.fn(),
  useHistory: () => ({ push: mockHistory })
}));

describe("Apartment Profile2", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFetch.mockReturnValueOnce({ data: mockApartment });
    useFetch.mockReturnValueOnce({ data: mockStayHistory });
  });

  it("should render the searchbar", () => {
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

  it("should render Remarks card", () => {
    render(<ApartmentProfile />);

    expect(screen.getByTestId("remarksCard")).toBeInTheDocument();
  });

  it("should render Occupants card", () => {
    render(<ApartmentProfile />);

    expect(screen.getByTestId("occupantsCard")).toBeInTheDocument();
  });

  it("should render Lease card", () => {
    render(<ApartmentProfile />);

    expect(screen.getByTestId("leaseCard")).toBeInTheDocument();
  });
});
