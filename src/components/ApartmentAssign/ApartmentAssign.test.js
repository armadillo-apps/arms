import React from "react";
import ApartmentAssign from "./ApartmentAssign";
import "@testing-library/react/cleanup-after-each";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("should render a search bar", () => {
  const { getByPlaceholderText } = render(<ApartmentAssign />);
  expect(getByPlaceholderText(/search occupants here.../i)).toBeInTheDocument();
});

it("should show a list of results with buttons", () => {
  const { getByPlaceholderText, getByText } = render(
    <ApartmentAssign
      dropdown={true}
      filterByText={() => [
        { name: "Natalie", employeeId: "12345ABC", remarks: "Loves Twisties" }
      ]}
    />
  );
  const inputField = getByPlaceholderText(/search occupants here.../i);
  fireEvent.change(inputField, { target: { value: "N" } });
  expect(getByText("Natalie")).toBeInTheDocument();
  expect(getByText("12345ABC")).toBeInTheDocument();
  expect(getByText("Loves Twisties")).toBeInTheDocument();
  expect(getByText("+")).toBeInTheDocument();
});

it("should show check-in and check-out input fields and two buttons when dropdown is set to false", () => {
  const { getByPlaceholderText, getByText } = render(
    <ApartmentAssign dropdown={false} />
  );
  expect(getByPlaceholderText(/check-in/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/check-out/i)).toBeInTheDocument();
  expect(getByText(/Add/i)).toBeInTheDocument();
  expect(getByText(/Cancel/i)).toBeInTheDocument();
});

it("should show the success message on assignment of occupant to particular apartment", () => {
  const { getByText } = render(
    <ApartmentAssign
      message={"Successfully assigned Tom to Viz Holland"}
      success={true}
    />
  );
  expect(
    getByText("Successfully assigned Tom to Viz Holland")
  ).toBeInTheDocument();
});

it("should show the success message on assignment of occupant to particular apartment", () => {
  const { getByText } = render(
    <ApartmentAssign message={"Failture!"} success={false} />
  );
  expect(getByText("Failture!")).toBeInTheDocument();
});