import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement, wait } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import * as data from "../../api/api";

import NewApartmentForm from "./NewApartmentForm";

const mockPost = jest.spyOn(data, "createNewApartment");
const NewApartmentFormWithContext = (
  <ToastProvider>
    <NewApartmentForm />
  </ToastProvider>
);

describe("New apartment form", () => {
  it("should have correct title on page", () => {
    const { getByText } = render(NewApartmentFormWithContext);
    expect(getByText("Create New Apartment")).toBeInTheDocument();
  });

  it("should have input text for apartment name on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/apartment name/i)).toBeInTheDocument();
  });

  it("should have input text for address on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/address/i)).toBeInTheDocument();
  });

  it("should have input text for landlord name on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/landLord name/i)).toBeInTheDocument();
  });

  it("should have input text for landlord account number on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/Landlord A\/C number/i)).toBeInTheDocument();
  });

  it("should have input text for lease start on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/lease start/i)).toBeInTheDocument();
  });

  it("should have input text for lease end on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/lease end/i)).toBeInTheDocument();
  });

  it("should have input text for rental per month on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/rental per month/i)).toBeInTheDocument();
  });

  it("should have a dropdown list for currency", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/Currency/i)).toBeInTheDocument();
  });

  it("should have input text for capacity on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/capacity/i)).toBeInTheDocument();
  });

  it("should have input text for bedrooms on page", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/bedrooms/i)).toBeInTheDocument();
  });

  it("should have a select field for apartment status", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/status/i)).toBeInTheDocument();
  });

  it("should have a select field for apartment's country", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    expect(getByLabelText(/country/i)).toBeInTheDocument();
  });

  it("should register number changes to the capacity input", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    const capacityInput = getByLabelText(/capacity/i);

    fireEvent.change(capacityInput, { target: { value: 2 } });

    expect(capacityInput).toHaveAttribute("type", "number");
    expect(capacityInput).toHaveValue(2);
  });

  it("should reject non-number changes to the capacity input", () => {
    const { getByLabelText } = render(NewApartmentFormWithContext);
    const capacityInput = getByLabelText(/capacity/i);

    fireEvent.change(capacityInput, { target: { value: "Not a valid input" } });

    expect(capacityInput).toHaveValue(null);
  });
});

describe("apartment form confirmation message", () => {
  it("should clear form after hitting submit", async () => {
    mockPost.mockReturnValueOnce("");

    const { getByLabelText, getByText } = render(NewApartmentFormWithContext);

    const nameInput = getByLabelText(/apartment name/i);
    const button = getByText("Create", { selector: "input[type=submit]" });

    fireEvent.change(nameInput, { target: { value: "Garden Shack" } });
    fireEvent.click(button);

    await wait(() => expect(nameInput.value).toBe(""));
  });

  it("should redirect to Apartments Page on creation", async () => {
    const history = { push: jest.fn() };
    const triggerRender = jest.fn();
    mockPost.mockReturnValueOnce("");

    const { getByLabelText, getByText } = render(
      <ToastProvider>
        <NewApartmentForm history={history} triggerRender={triggerRender} />
      </ToastProvider>
    );

    const nameInput = getByLabelText(/apartment name/i);
    const button = getByText("Create", { selector: "input[type=submit]" });

    fireEvent.change(nameInput, { target: { value: "Garden Shack" } });
    fireEvent.click(button);
    await wait(() => {
      expect(history.push).toHaveBeenCalled();
    });
  });

  it("should display failure message when there is an error", async () => {
    const { getByLabelText, getByText } = render(NewApartmentFormWithContext);

    const nameInput = getByLabelText(/apartment name/i);
    const button = getByText("Create", { selector: "input[type=submit]" });

    fireEvent.change(nameInput, { target: { value: "Garden Shack" } });
    fireEvent.click(button);

    const failureMessage = await waitForElement(() =>
      getByText("Unable to create new apartment :(")
    );
    expect(failureMessage).toBeInTheDocument();
  });
});
