import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewApartmentForm from "./NewApartmentForm";
import { fireEvent } from "@testing-library/react/dist";

describe("New apartment form", () => {
  it("should have correct title on page", () => {
    const { getByText } = render(<NewApartmentForm />);
    expect(getByText("Create New Apartment")).toBeInTheDocument();
  });

  it("should have input text for apartment name on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Apartment name")).toBeInTheDocument();
  });

  it("should have input text for address on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Address")).toBeInTheDocument();
  });

  it("should have input text for landlord name on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("LandLord name")).toBeInTheDocument();
  });

  it("should have input text for landlord account number on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Landlord A/C No")).toBeInTheDocument();
  });

  it("should have input text for landlord email on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("LandLord Email")).toBeInTheDocument();
  });

  it("should have input text for landlord mobile number on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("LandLord Mobile no")).toBeInTheDocument();
  });

  it("should have input text for lease start on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Lease Start")).toBeInTheDocument();
  });

  it("should have input text for lease end on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Lease End")).toBeInTheDocument();
  });

  it("should have input text for rental per month on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Rental per month")).toBeInTheDocument();
  });

  it("should have input text for capacity on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Capacity")).toBeInTheDocument();
  });

  it("should have input text for bedrooms on page", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText("Bedrooms")).toBeInTheDocument();
  });

  it("should register number changes to the capacity input", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    const capacityInput = getByLabelText("Capacity");

    fireEvent.change(capacityInput, { target: { value: 2 } });

    expect(capacityInput).toHaveAttribute("type", "number");
    expect(capacityInput).toHaveValue(2);
  });

  it("should reject non-number changes to the capacity input", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    const capacityInput = getByLabelText("Capacity");

    fireEvent.change(capacityInput, { target: { value: "Not a valid input" } });

    expect(capacityInput).toHaveValue(null);
  });
});
