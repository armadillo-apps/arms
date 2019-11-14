import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import { Apartment } from "../Apartment/Apartment";
import { fireEvent } from "@testing-library/react/dist";
import * as data from "../../api/api";

const mockPost = jest.spyOn(data, "fetchApartments");

const apartments = [
  {
    _id: "123",
    name: "The Forest",
    address: "18 Bogus Street #01-01",
    bedrooms: 1,
    capacity: 10,
    status: "Active",
    leases: [
      {
        leaseStart: "25 June 2019",
        leaseEnd: "24 June 2020",
        monthlyRent: 5000,
        currency: "THB"
      }
    ]
  }
];

describe("Redirect to apartment profile page", () => {
  it("should redirect to Apartment Profile Page on selection", async () => {
    const history = { push: jest.fn() };
    const triggerRender = jest.fn();
    mockPost.mockReturnValueOnce("");

    const { getByText } = render(
      <Apartment
        apartments={apartments}
        stays={[]}
        history={history}
        triggerRender={triggerRender}
      />
    );

    const apartmentName = getByText("The Forest");

    fireEvent.click(apartmentName);

    await Promise.resolve();

    expect(history.push).toHaveBeenCalled();
  });
});
