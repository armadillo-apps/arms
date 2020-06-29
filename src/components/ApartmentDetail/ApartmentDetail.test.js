import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import ApartmentDetail from "./ApartmentDetail";
import { mockApartment, mockExpiringApartment } from "../../mocks/mockData";
import routes from "../../router/RouterPaths";

const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

const testDate = new Date("2020-05-26T11:00:00.135Z").valueOf();
jest.spyOn(global.Date, "now").mockReturnValue(testDate);

describe("ApartmentDetail", () => {
  const ApartmentDetailWithTable = (apartment, vacancy) => (
    <table>
      <tbody>
        <ApartmentDetail apartment={apartment} vacancy={vacancy} />
      </tbody>
    </table>
  );

  it("should redirect to Apartment Profile Page when clicked", () => {
    render(ApartmentDetailWithTable(mockApartment, 1));

    fireEvent.click(screen.getByText(mockApartment.name));

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(
      `${routes.APARTMENTS}/${mockApartment._id}`
    );
  });

  it("should show Lease End in red colour when lease is expiring in 1 month", () => {
    render(ApartmentDetailWithTable(mockExpiringApartment, 1));

    const leaseEndDate = screen.getByTestId("leaseEndDate");

    expect(leaseEndDate).toHaveClass("leaseExpiring");
  });

  it("should not show Lease End in red colour when lease is not expiring in 1 month", () => {
    render(ApartmentDetailWithTable(mockApartment, 1));

    const leaseEndDate = screen.getByTestId("leaseEndDate");

    expect(leaseEndDate).not.toHaveClass("leaseExpiring");
  });
});
