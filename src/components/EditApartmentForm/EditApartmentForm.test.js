import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EditApartmentForm from "./EditApartmentForm";

const apartment = {
  _id: "12345",
  name: "Fancy Penthouse",
  address: "18 Bogus Street #01-01",
  bedrooms: 1,
  capacity: 1,
  status: "active",
  leases: [
    {
      leaseStart: "2019-11-12",
      leaseEnd: "2019-11-30",
      monthlyRent: 5000,
      currency: "THB"
    }
  ],
  landlord: {
    name: "Bob",
    accountNumber: "12345"
  },
  remarks: "helloo",
  country: "Singapore"
};

const currentOccupants = [];

const futureOccupants = [
  {
    name: "Jane"
  }
];

describe("EditApartmentForm", () => {
  describe("Form fields", () => {
    it("should contain correct title", () => {
      const { getByText } = render(<EditApartmentForm apartment={apartment} />);
      expect(getByText("Edit Apartment")).toBeInTheDocument();
    });
    it("should render Name input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Apartment Name")).toBeInTheDocument();
      expect(getByLabelText("Apartment Name")).toHaveAttribute("type", "text");
    });

    it("should render Address input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Address")).toBeInTheDocument();
      expect(getByLabelText("Address")).toHaveAttribute("type", "text");
    });

    it("should render Bedrooms input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Bedrooms")).toBeInTheDocument();
      expect(getByLabelText("Bedrooms")).toHaveAttribute("type", "number");
    });

    it("should render Capacity input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Capacity")).toBeInTheDocument();
      expect(getByLabelText("Capacity")).toHaveAttribute("type", "number");
    });

    it("should render Country select field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Country")).toBeInTheDocument();
    });

    it("should render Status select field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Status")).toBeInTheDocument();
    });

    it("should render lease start date select field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Lease Start")).toBeInTheDocument();
    });

    it("should render lease end date select field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Lease End")).toBeInTheDocument();
    });

    it("should render monthly rent input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Monthly Rent")).toBeInTheDocument();
    });

    it("should render currency select field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Currency")).toBeInTheDocument();
    });

    it("should render Landlord Name input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Landlord Name")).toBeInTheDocument();
      expect(getByLabelText("Landlord Name")).toHaveAttribute("type", "text");
    });

    it("should render Landlord A/C number input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Landlord A/C Number")).toBeInTheDocument();
      expect(getByLabelText("Landlord A/C Number")).toHaveAttribute(
        "type",
        "text"
      );
    });

    it("should render Remarks input field", () => {
      const { getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      expect(getByLabelText("Remarks")).toBeInTheDocument();
    });

    it("should render an Update button", () => {
      const { getByText } = render(<EditApartmentForm apartment={apartment} />);
      expect(getByText("Update")).toBeInTheDocument();
      expect(getByText("Update")).toHaveAttribute("type", "submit");
    });

    it("should render a Cancel button", () => {
      const { getByText } = render(<EditApartmentForm apartment={apartment} />);
      expect(getByText("Cancel")).toBeInTheDocument();
      expect(getByText("Cancel")).toHaveAttribute("type", "button");
    });
  });

  describe("Change form values", () => {
    it("should update Apartment Name", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const apartmentName = getByLabelText("Apartment Name");
      fireEvent.change(apartmentName, { target: { value: "New Condominium" } });
      expect(getByDisplayValue("New Condominium")).toBeInTheDocument();
    });

    it("should update Address", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const address = getByLabelText("Address");
      fireEvent.change(address, {
        target: { value: "Upper Serangoon Avenue" }
      });
      expect(getByDisplayValue("Upper Serangoon Avenue")).toBeInTheDocument();
    });

    it("should update Bedroom", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const bedrooms = getByLabelText("Bedrooms");
      fireEvent.change(bedrooms, {
        target: { value: 2 }
      });
      expect(getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should update Capacity", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const capacity = getByLabelText("Capacity");
      fireEvent.change(capacity, {
        target: { value: 2 }
      });
      expect(getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should have a dropdown to update Country", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const country = getByLabelText("Country");
      fireEvent.change(country, {
        target: { value: "Thailand" }
      });
      expect(getByDisplayValue("Thailand")).toBeInTheDocument();
    });

    it("should have a dropdown to update Status", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm
          apartment={apartment}
          currentOccupants={currentOccupants}
          futureOccupants={futureOccupants}
        />
      );
      const status = getByLabelText("Status");
      fireEvent.change(status, {
        target: { value: "active" }
      });
      expect(getByDisplayValue("Active")).toBeInTheDocument();
    });

    it("should not be able to update Status to Inactive if there are occupants", () => {
      const { getByText, getByTestId } = render(
        <EditApartmentForm
          apartment={apartment}
          currentOccupants={currentOccupants}
          futureOccupants={futureOccupants}
        />
      );

      const status = getByTestId("editApartment__status");
      fireEvent.change(status, { target: { value: "inactive" } });
      expect(
        getByText(
          "Unable to change to inactive when there are current or future occupants"
        )
      ).toBeInTheDocument();
    });

    it("should update Landlord name", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const landlordName = getByLabelText("Landlord Name");
      fireEvent.change(landlordName, { target: { value: "Jane" } });
      expect(getByDisplayValue("Jane")).toBeInTheDocument();
    });

    it("should update Landlord A/C", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const landlordAccountNumber = getByLabelText("Landlord A/C Number");
      fireEvent.change(landlordAccountNumber, {
        target: { value: "123456" }
      });
      expect(getByDisplayValue("123456")).toBeInTheDocument();
    });

    it("should update Remarks", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const remarks = getByLabelText("Remarks");
      fireEvent.change(remarks, {
        target: { value: "Good landlord" }
      });
      expect(getByDisplayValue("Good landlord")).toBeInTheDocument();
    });

    it("should update lease start date", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const leaseStart = getByLabelText("Lease Start");
      fireEvent.change(leaseStart, {
        target: { value: "2020-11-12" }
      });
      expect(getByDisplayValue("2020-11-12")).toBeInTheDocument();
    });

    it("should update lease end date", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const leaseEnd = getByLabelText("Lease End");
      fireEvent.change(leaseEnd, {
        target: { value: "2020-11-30" }
      });
      expect(getByDisplayValue("2020-11-30")).toBeInTheDocument();
    });

    it("should update monthly rent", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const monthlyRent = getByLabelText("Monthly Rent");
      fireEvent.change(monthlyRent, {
        target: { value: "8000" }
      });
      expect(getByDisplayValue("8000")).toBeInTheDocument();
    });

    it("should update currency", () => {
      const { getByDisplayValue, getByLabelText } = render(
        <EditApartmentForm apartment={apartment} />
      );
      const currency = getByLabelText("Currency");
      fireEvent.change(currency, {
        target: { value: "THB" }
      });
      expect(getByDisplayValue("THB")).toBeInTheDocument();
    });
  });

  describe("Initial values", () => {
    const apartment = {
      name: "Parc Sophia",
      address: "18 Cross Street",
      bedrooms: 1,
      capacity: 2,
      status: "active",
      country: "Singapore",
      leases: [
        {
          leaseStart: "2020-11-12",
          leaseEnd: "2020-11-30",
          monthlyRent: 5000,
          currency: "THB"
        }
      ],
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
        status: "active",
        country: "Singapore",
        leaseStart: "2020-11-12",
        leaseEnd: "2020-11-30",
        monthlyRent: 5000,
        currency: "THB",
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

      const { getByText, getByLabelText, getByTestId } = render(
        <EditApartmentForm onSubmit={onSubmit} apartment={apartment} />
      );

      const nameInput = getByLabelText("Apartment Name");
      fireEvent.change(nameInput, { target: { value: "The Beacon" } });

      const country = getByTestId("editApartment__country");
      fireEvent.change(country, { target: { value: "Thailand" } });

      const updateButton = getByText("Update");
      fireEvent.click(updateButton);

      const updatedApartment = {
        apartmentId: "12345",
        name: "The Beacon",
        address: "18 Bogus Street #01-01",
        bedrooms: 1,
        capacity: 1,
        status: "active",
        leases: [
          {
            leaseStart: "2019-11-12",
            leaseEnd: "2019-11-30",
            monthlyRent: 5000,
            currency: "THB"
          }
        ],
        landlord: {
          name: "Bob",
          accountNumber: "12345"
        },
        remarks: "helloo",
        country: "Thailand"
      };
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.anything(),
        updatedApartment
      );
    });
  });
});
