import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import EditApartmentForm from "./EditApartmentForm";

describe("EditApartmentForm", () => {
  describe("Form fields", () => {
    it("should contain correct title", () => {
      const { getByText } = render(<EditApartmentForm />);
      expect(getByText("Edit Apartment")).toBeInTheDocument();
    });
    it("should render Name input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Apartment Name")).toBeInTheDocument();
      expect(getByLabelText("Apartment Name")).toHaveAttribute("type", "text");
    });

    it("should render Address input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Address")).toBeInTheDocument();
      expect(getByLabelText("Address")).toHaveAttribute("type", "text");
    });

    it("should render Bedrooms input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Bedrooms")).toBeInTheDocument();
      expect(getByLabelText("Bedrooms")).toHaveAttribute("type", "number");
    });

    it("should render Capacity input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Capacity")).toBeInTheDocument();
      expect(getByLabelText("Capacity")).toHaveAttribute("type", "number");
    });

    it("should render Country input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Country")).toBeInTheDocument();
      expect(getByLabelText("Country")).toHaveAttribute("type", "text");
    });

    it("should render Landlord Name input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Landlord Name")).toBeInTheDocument();
      expect(getByLabelText("Landlord Name")).toHaveAttribute("type", "text");
    });

    it("should render Landlord A/C number input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Landlord A/C Number")).toBeInTheDocument();
      expect(getByLabelText("Landlord A/C Number")).toHaveAttribute(
        "type",
        "text"
      );
    });

    it("should render Remarks input field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText("Remarks")).toBeInTheDocument();
    });

    it("should render an Update button", () => {
      const { getByText } = render(<EditApartmentForm />);
      expect(getByText("Update")).toBeInTheDocument();
      expect(getByText("Update")).toHaveAttribute("type", "submit");
    });

    it("should render a Cancel button", () => {
      const { getByText } = render(<EditApartmentForm />);
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Cancel")).toHaveAttribute("type", "button");
    });
  });

  describe("Initial values", () => {
    const apartment = {
      name: "Parc Sophia",
      address: "18 Cross Street",
      bedrooms: 1,
      capacity: 2,
      country: "Singapore",
      landlord: {
        name: "Tony Stark",
        accountNumber: "12345"
      },
      remarks: "Great place"
    };

    it("should render initial values for all fields", () => {
      const { getByTestId } = render(
        <EditApartmentForm apartment={apartment} />
      );

      const form = getByTestId("editApartmentForm");
      expect(form).toHaveFormValues({
        name: "Parc Sophia",
        address: "18 Cross Street",
        bedrooms: 1,
        capacity: 2,
        country: "Singapore",
        landlordName: "Tony Stark",
        landlordAccountNumber: "12345",
        remarks: "Great place"
      });
    });
  });

  describe("Update button", () => {
    it("should call onSubmit with updated details", () => {
      const onSubmit = jest.fn().mockImplementation(event => {
        event.preventDefault();
      });

      const { getByText, getByLabelText } = render(
        <EditApartmentForm onSubmit={onSubmit} />
      );

      const nameInput = getByLabelText("Apartment Name");
      fireEvent.change(nameInput, { target: { value: "The Beacon" } });

      const updateButton = getByText("Update");
      fireEvent.click(updateButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(expect.anything(),{ name: "The Beacon" });
    });
  });
});
