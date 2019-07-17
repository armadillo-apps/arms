import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewApartmentForm from "./NewApartmentForm";
import { fireEvent } from "@testing-library/react/dist";

describe("New apartment form", () => {
  it("should have input areas for name, address, bedrooms, capacity, lease, and landlord", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/address/i)).toBeInTheDocument();
    expect(getByLabelText(/bedrooms/i)).toBeInTheDocument();
    expect(getByLabelText(/capacity/i)).toBeInTheDocument();
    expect(getByLabelText(/lease start/i)).toBeInTheDocument();
    expect(getByLabelText(/lease end/i)).toBeInTheDocument();
    expect(getByLabelText(/rent/i)).toBeInTheDocument();
    expect(getByLabelText(/landlord name/i)).toBeInTheDocument();
    expect(getByLabelText(/landlord account/i)).toBeInTheDocument();
    expect(getByLabelText(/landlord mobile/i)).toBeInTheDocument();
    expect(getByLabelText(/landlord email/i)).toBeInTheDocument();
  });

  it("should register number changes to the capacity input", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    const capacityInput = getByLabelText(/capacity/i);
    fireEvent.change(capacityInput, { target: { value: 2 } });
    expect(capacityInput).toHaveAttribute("type", "number");
    expect(capacityInput).toHaveValue(2);
  });

  it("should reject non-number changes to the capacity input", () => {
    const { getByLabelText } = render(<NewApartmentForm />);
    const capacityInput = getByLabelText(/capacity/i);
    fireEvent.change(capacityInput, { target: { value: "GARBAGE!" } });
    expect(capacityInput).toHaveValue("");
  });
});
