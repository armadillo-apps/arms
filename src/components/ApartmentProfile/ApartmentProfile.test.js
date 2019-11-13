import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";
import ApartmentProfile from "./ApartmentProfile";
import * as data from "../../api/api";

const apartmentDetails = [
  {
    _id: "12345abc",
    name: "Fancy Penthouse",
    address: "18 Bogus Street #01-01",
    bedrooms: 1,
    capacity: 1,
    landlord: {
      name: "Bob",
      accountNumber: "12345"
    },
    leases: [
      {
        _id: "5678tyu",
        leaseStart: "25 Jun 19",
        leaseEnd: "25 Jun 22",
        monthlyRent: 1000,
        currency: "SGD"
      },
      {
        _id: "9872wer",
        leaseStart: "26 Jun 19",
        leaseEnd: "26 Jun 22",
        monthlyRent: 2000,
        currency: "THB"
      }
    ]
  },
  {
    _id: "67890def",
    name: "Garden Shack",
    address: "10 Another Road #05-10",
    bedrooms: 2,
    capacity: 2,
    landlord: {
      name: "Jack",
      accountNumber: "54321"
    },
    leases: [
      {
        _id: "5555tyu",
        leaseStart: "25 Jun 19",
        leaseEnd: "25 Jun 22",
        monthlyRent: 1000,
        currency: "SGD"
      }
    ]
  }
];

const stayingHistory = [
  {
    _id: "67890123",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: new Date("01-01-2010"),
    checkOutDate: new Date("01-01-2011"),
    leaseId: "e83724nht8",
    occupantName: "John"
  },
  {
    _id: "67890124",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80017be1234",
    checkInDate: new Date("01-01-2200"),
    checkOutDate: new Date("01-01-2300"),
    leaseId: "e83724nht8",
    occupantName: "Tim"
  },
  {
    _id: "67890125",
    apartmentId: "12345abc",
    occupantId: "5d2ef34111ead80016be1324",
    checkInDate: new Date("01-01-2018"),
    checkOutDate: new Date(),
    leaseId: "e83724nht8",
    occupantName: "Kai"
  }
];

const occupantToBeDeleted = [
  {
    _id: "67890120",
    apartmentId: "12345abc",
    occupantId: "1d2ef34111ead80016be1324",
    checkInDate: new Date("01-01-2018"),
    checkOutDate: new Date(),
    leaseId: "e83724nht8",
    occupantName: "Jane"
  }
];

const getApartmentProfileHistory = jest.spyOn(
  data,
  "getApartmentProfileHistory"
);

describe("Apartment Profile", () => {
  let match, onSubmit;
  const editApartmentModal = {
    success: false,
    message: ""
  };
  beforeEach(() => {
    match = {
      params: { apartmentId: "12345abc" },
      isExact: true,
      path: "",
      url: ""
    };

    onSubmit = jest.fn().mockImplementation(event => {
      event.preventDefault();
    });
  });

  afterEach(cleanup);

  it("should render field labels", () => {
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );

    expect(getByText("Address")).toBeInTheDocument();
    expect(getByText("Bedrooms")).toBeInTheDocument();
    expect(getByText("Capacity")).toBeInTheDocument();
    expect(getByText("No. of Occupants")).toBeInTheDocument();
    expect(getByText("Occupants")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Check-In")).toBeInTheDocument();
    expect(getByText("Check-Out")).toBeInTheDocument();
    expect(getByText("Leases")).toBeInTheDocument();
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("Lease End")).toBeInTheDocument();
    expect(getByText("Monthly Rent")).toBeInTheDocument();
  });

  it("should render the apartments details", () => {
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );

    expect(getByText(/fancy penthouse/i)).toBeInTheDocument();
    expect(getByText(/18 Bogus Street #01-01/i)).toBeInTheDocument();
    expect(getByText(/25 Jun 19/i)).toBeInTheDocument();
    expect(getByText(/25 Jun 22/i)).toBeInTheDocument();
    expect(getByText("SGD 1,000.00")).toBeInTheDocument();
    expect(getByText(/26 Jun 19/i)).toBeInTheDocument();
    expect(getByText(/26 Jun 22/i)).toBeInTheDocument();
    expect(getByText("THB 2,000.00")).toBeInTheDocument();
  });

  it("should render a Back button", () => {
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );

    expect(getByText("< Back to Apartment Listings")).toBeInTheDocument();
  });

  it("should render occupant history", async () => {
    getApartmentProfileHistory.mockReturnValueOnce(stayingHistory);
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );
    const occupantName1 = await waitForElement(() => getByText("John"));
    const occupantName2 = await waitForElement(() => getByText("Tim"));
    const checkInDate1 = await waitForElement(() => getByText("1 Jan 10"));
    const checkOutDate2 = await waitForElement(() => getByText("1 Jan 11"));

    expect(occupantName1).toBeInTheDocument();
    expect(occupantName2).toBeInTheDocument();
    expect(checkInDate1).toBeInTheDocument();
    expect(checkOutDate2).toBeInTheDocument();
  });

  it("should display the modal with the delete confirmation message when X is clicked", async () => {
    getApartmentProfileHistory.mockReturnValueOnce(occupantToBeDeleted);
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );
    const occupantName = await waitForElement(() => getByText("Jane"));
    expect(occupantName).toBeInTheDocument();
    const xButton = getByText("X");
    fireEvent.click(xButton);
    expect(
      getByText("Are you sure you want to delete this entry?")
    ).toBeInTheDocument();
  });

  it("should render message when occupant history is empty", async () => {
    getApartmentProfileHistory.mockReturnValueOnce([]);
    const { getByText } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );
    const message = await waitForElement(() => getByText("No occupants yet!"));

    expect(message).toBeInTheDocument();
  });

  it("should be able to update the number of occupants", async () => {
    getApartmentProfileHistory.mockReturnValueOnce(stayingHistory);
    const { getByTestId } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );
    const noOccupants = await waitForElement(() =>
      getByTestId("occupantsCount")
    );
    expect(noOccupants).toBeInTheDocument();
    expect(noOccupants.textContent).toEqual("1");
  });

  it("should sort occupants by check-in date", async () => {
    getApartmentProfileHistory.mockReturnValueOnce(stayingHistory);
    const { getAllByTestId } = render(
      <ApartmentProfile
        apartments={apartmentDetails}
        match={match}
        editApartmentModal={editApartmentModal}
        onSubmit={onSubmit}
      />
    );
    const occupants = await waitForElement(() => getAllByTestId("tableRow"));
    expect(occupants[0]).toHaveClass("futureOccupants");
    expect(JSON.stringify(occupants[0].innerHTML)).toMatch("Tim");
    expect(occupants[1]).toHaveClass("currentOccupants");
    expect(JSON.stringify(occupants[1].innerHTML)).toMatch("Kai");
    expect(occupants[2]).toHaveClass("pastOccupants");
    expect(JSON.stringify(occupants[2].innerHTML)).toMatch("John");
  });

  describe("EditApartmentFormModal", () => {
    let onSubmit, clearConfirmationMessage;
    beforeEach(() => {
      onSubmit = jest.fn().mockImplementation(event => {
        event.preventDefault();
      });
      clearConfirmationMessage = jest.fn().mockImplementation();
    });
    it("should open modal when edit button is clicked", () => {
      const editApartmentModal = {
        success: false,
        message: ""
      };

      const { getByText } = render(
        <ApartmentProfile
          apartments={apartmentDetails}
          match={match}
          editApartmentModal={editApartmentModal}
          onSubmit={onSubmit}
          clearConfirmationMessage={clearConfirmationMessage}
        />
      );

      const editButton = getByText("Edit");
      fireEvent.click(editButton);

      const modalHeader = getByText("Edit Apartment");
      expect(modalHeader).toBeInTheDocument();
    });

    it("should close modal when cancel button is clicked", () => {
      const editApartmentModal = {
        success: false,
        message: ""
      };

      const { getByText, queryByText } = render(
        <ApartmentProfile
          apartments={apartmentDetails}
          match={match}
          editApartmentModal={editApartmentModal}
          onSubmit={onSubmit}
          clearConfirmationMessage={clearConfirmationMessage}
        />
      );

      const editButton = getByText("Edit");
      fireEvent.click(editButton);
      const cancelButton = getByText("Cancel");
      fireEvent.click(cancelButton);

      const modalHeader = queryByText("Edit Apartment");
      expect(modalHeader).not.toBeInTheDocument();
    });

    it("should show error message when updating apartment is not successful", () => {
      const editApartmentModal = {
        success: false,
        message: "Unable to update apartment"
      };
      const { getByText } = render(
        <ApartmentProfile
          apartments={apartmentDetails}
          match={match}
          editApartmentModal={editApartmentModal}
          onSubmit={onSubmit}
          clearConfirmationMessage={clearConfirmationMessage}
        />
      );

      const editButton = getByText("Edit");
      fireEvent.click(editButton);
      const updateButton = getByText("Update");
      fireEvent.click(updateButton);

      expect(getByText(/Unable to update apartment/i)).toBeInTheDocument();
    });
  });
});
