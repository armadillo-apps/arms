import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import EditApartmentForm from "./EditApartmentForm";

const apartment = {
  _id: "12345",
  name: "Fancy Penthouse",
  address: "18 Bogus Street #01-01",
  bedrooms: 1,
  capacity: 1,
  status: "Active",
  landlord: {
    name: "Bob",
    accountNumber: "12345"
  },
  remarks: "helloo",
  country: "Singapore"
};

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

    it("should render Country select field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText(/country/i)).toBeInTheDocument();
    });

    it("should render Status select field", () => {
      const { getByLabelText } = render(<EditApartmentForm />);
      expect(getByLabelText(/status/i)).toBeInTheDocument();
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

  describe("Change form values", () => {
    it("should update Apartment Name", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const apartmentName = getByLabelText("Apartment Name");
      fireEvent.change(apartmentName, { target: { value: "New Condominium" } });
      expect(getByDisplayValue("New Condominium")).toBeInTheDocument();
    });

    it("should update Address", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const address = getByLabelText("Address");
      fireEvent.change(address, {
        target: { value: "Upper Serangoon Avenue" }
      });
      expect(getByDisplayValue("Upper Serangoon Avenue")).toBeInTheDocument();
    });

    it("should update Bedroom", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const bedrooms = getByLabelText("Bedrooms");
      fireEvent.change(bedrooms, {
        target: { value: 2 }
      });
      expect(getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should update Capacity", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const capacity = getByLabelText("Capacity");
      fireEvent.change(capacity, {
        target: { value: 2 }
      });
      expect(getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should update Country", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const country = getByLabelText("Country");
      fireEvent.change(country, {
        target: { value: "Singapore" }
      });
      expect(getByDisplayValue("Singapore")).toBeInTheDocument();
    });

    it("should update Landlord name", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const landlordName = getByLabelText("Landlord Name");
      fireEvent.change(landlordName, { target: { value: "Jane" } });
      expect(getByDisplayValue("Jane")).toBeInTheDocument();
    });

    it("should update Landlord A/C", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const landlordAccountNumber = getByLabelText("Landlord A/C Number");
      fireEvent.change(landlordAccountNumber, {
        target: { value: "12345" }
      });
      expect(getByDisplayValue("12345")).toBeInTheDocument();
    });
    it("should update Remarks", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm />
      );
      const remarks = getByLabelText("Remarks");
      fireEvent.change(remarks, {
        target: { value: "Good landlord" }
      });
      expect(getByDisplayValue("Good landlord")).toBeInTheDocument();
    });
  });

  describe("Initial values", () => {
    const apartment = {
      name: "Parc Sophia",
      address: "18 Cross Street",
      bedrooms: 1,
      capacity: 2,
      status: "Active",
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
        status: "Active",
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
        <EditApartmentForm onSubmit={onSubmit} apartment={apartment} />
      );

      const nameInput = getByLabelText("Apartment Name");
      fireEvent.change(nameInput, { target: { value: "The Beacon" } });

      const updateButton = getByText("Update");
      fireEvent.click(updateButton);

      const updatedApartment = {
        apartmentId: "12345",
        name: "The Beacon",
        address: "18 Bogus Street #01-01",
        bedrooms: 1,
        capacity: 1,
        status: "Active",
        landlord: {
          name: "Bob",
          accountNumber: "12345"
        },
        remarks: "helloo",
        country: "Singapore"
      };
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.anything(),
        updatedApartment
      );
    });
  });
});
