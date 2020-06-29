import React from "react";
import { Apartment } from "./Apartment";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { mockApartments } from "../../mocks/mockData";
import { sortApartmentsByStatus } from "./utils";
import routes from "../../router/RouterPaths";
import { useFetch } from "../../hooks/useFetch";
import { UserProvider } from "../../context/UserContext";

jest.mock("../../hooks/useFetch");
const adminUser = { role: "admin" };
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

const ApartmentsWithContext = () => (
  <UserProvider user={adminUser}>
    <Apartment />
  </UserProvider>
);
describe("Apartment", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    useFetch.mockReturnValue({ data: mockApartments });
  });

  it("renders the name of the apartment", () => {
    const { getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Apartment Name")).toBeInTheDocument();
    expect(getByText("Parc Sophia")).toBeInTheDocument();
    expect(getByText("Sea View")).toBeInTheDocument();
  });

  it("renders the monthly rent of the apartment", () => {
    const { getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Rental Per Month")).toBeInTheDocument();
    expect(getByText("THB 5,000.00")).toBeInTheDocument();
    expect(getByText("SGD 4,000.00")).toBeInTheDocument();
  });

  it("renders the lease start of the apartment", () => {
    const { getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Lease Start")).toBeInTheDocument();
    expect(getByText("25 June 2019")).toBeInTheDocument();
  });

  it("renders the lease end of the apartment", () => {
    const { getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );
    expect(getByText("Lease End")).toBeInTheDocument();
    expect(getByText("24 June 2020")).toBeInTheDocument();
  });

  it("should be able to filter apartments using searchbar correctly", () => {
    render(<ApartmentsWithContext />);

    const inputField = screen.getByPlaceholderText(/search apartment/i);

    fireEvent.change(inputField, { target: { value: "p" } });

    expect(screen.getByText("Parc Sophia")).toBeInTheDocument();
    expect(screen.queryByText("Sea View")).not.toBeInTheDocument();
  });

  it("should return all apartments if searchbar is not used", () => {
    const { getByPlaceholderText, getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );
    const inputField = getByPlaceholderText(/search apartment/i);
    const startDateInput = getByPlaceholderText(/start date/i);
    const endDateInput = getByPlaceholderText(/end date/i);
    const sentosa = getByText("Sentosa Cove");
    const parcSophia = getByText("Parc Sophia");
    const seaView = getByText("Sea View");

    fireEvent.change(inputField, { target: { value: " " } });
    fireEvent.change(startDateInput, { target: { value: " " } });
    fireEvent.change(endDateInput, { target: { value: " " } });

    expect(sentosa).toBeInTheDocument();
    expect(parcSophia).toBeInTheDocument();
    expect(seaView).toBeInTheDocument();
  });

  it("should be able to filter apartments using date picker correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );

    const startDateInput = getByPlaceholderText(/start date/i);
    const endDateInput = getByPlaceholderText(/end date/i);
    const sentosa = getByText("Sentosa Cove");
    const parcSophia = getByText("Parc Sophia");
    const seaView = getByText("Sea View");

    fireEvent.change(startDateInput, { target: { value: "01/01/2021" } });
    fireEvent.change(endDateInput, { target: { value: "23/06/2021" } });

    expect(sentosa).not.toBeInTheDocument();
    expect(parcSophia).not.toBeInTheDocument();
    expect(seaView).toBeInTheDocument();
  });

  it("should redirect admin to create new apartment page on click", () => {
    const { getByText } = render(
      <ApartmentsWithContext apartments={mockApartments} stays={[]} />
    );

    const addApartmentButton = getByText("+ Add Apartment");

    fireEvent.click(addApartmentButton);

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(routes.NEW_APARTMENT);
  });

  it("should not show guest the link to create new apartment page", () => {
    const guestUser = { role: "guest" };
    const ApartmentsWithGuestUserContext = () => (
      <UserProvider user={guestUser}>
        <Apartment />
      </UserProvider>
    );

    const { queryByText } = render(<ApartmentsWithGuestUserContext />);

    const addApartmentButton = queryByText("+ Add Apartment");

    expect(addApartmentButton).not.toBeInTheDocument();
  });

  describe("Sorting apartment", () => {
    it("should sort apartment by status and lease dates", () => {
      const sorted = sortApartmentsByStatus(mockApartments);
      expect(sorted[0].name).toBe("Parc Sophia");
      expect(sorted[1].name).toBe("Sea View");
      expect(sorted[2].name).toBe("Sentosa Cove");
    });
  });
});
