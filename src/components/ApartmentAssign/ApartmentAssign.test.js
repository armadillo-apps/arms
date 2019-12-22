import React from "react";
import ApartmentAssign from "./ApartmentAssign";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

describe("ApartmentAssign", () => {
  it("should render a search bar", () => {
    const { getByPlaceholderText } = render(<ApartmentAssign />);
    expect(
      getByPlaceholderText(/search occupants here.../i)
    ).toBeInTheDocument();
  });

  it("should render result headers when there is user input in search bar", () => {
    const { getByText } = render(
      <ApartmentAssign
        dropdown={true}
        occupantToAssign="John"
        handleChange={jest.fn()}
        filterList={() => []}
      />
    );

    expect(getByText(/name/i)).toBeInTheDocument();
    expect(getByText(/remarks/i)).toBeInTheDocument();
    expect(getByText(/employee id/i)).toBeInTheDocument();
  });

  it("should not render occupant info when occupant cannot be found", () => {
    const { queryByText } = render(
      <ApartmentAssign
        dropdown={true}
        handleChange={jest.fn()}
        filterList={() => []}
      />
    );

    expect(queryByText("John")).not.toBeInTheDocument();
  });

  it("should render occupant info with select button after occupant is found", () => {
    const { getByPlaceholderText, getByText } = render(
      <ApartmentAssign
        dropdown={true}
        filterList={() => [
          { name: "Natalie", employeeId: "12345ABC", remarks: "Loves Twisties" }
        ]}
      />
    );
    const inputField = getByPlaceholderText(/search occupants here.../i);
    fireEvent.change(inputField, { target: { value: "N" } });
    expect(getByText("Natalie")).toBeInTheDocument();
    expect(getByText("12345ABC")).toBeInTheDocument();
    expect(getByText("Loves Twisties")).toBeInTheDocument();
    expect(getByText("Select")).toBeInTheDocument();
  });

  it("should call handleClick prop when select button is clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <ApartmentAssign
        dropdown={true}
        filterList={() => [
          { name: "Natalie", employeeId: "12345ABC", remarks: "Loves Twisties" }
        ]}
        handleClick={handleClick}
      />
    );

    expect(getByText("Natalie")).toBeInTheDocument();
    const selectButton = getByText("Select");
    fireEvent.click(selectButton);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should show date selection fields and two buttons after an occupant is selected", () => {
    const { getByPlaceholderText, getByText } = render(
      <ApartmentAssign dropdown={false} />
    );

    expect(getByText(/check-in/i)).toBeInTheDocument();
    expect(getByPlaceholderText("checkInDateSelector")).toBeInTheDocument();
    expect(getByText(/check-out/i)).toBeInTheDocument();
    expect(getByPlaceholderText("checkOutDateSelector")).toBeInTheDocument();
    expect(getByText(/assign/i)).toBeInTheDocument();
    expect(getByText(/cancel/i)).toBeInTheDocument();
  });

  it("should call handleClick prop when cancel button in date selection form is clicked", () => {
    const handleClick = jest.fn(() => {});
    const { getByText } = render(
      <ApartmentAssign dropdown={false} handleClick={handleClick} />
    );
    const cancelButton = getByText(/cancel/i);

    fireEvent.click(cancelButton);

    expect(handleClick).toHaveBeenCalled();
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

  it("should show the failure message when assignment of occupant to particular apartment fails", () => {
    const { getByText } = render(
      <ApartmentAssign message={"Failure!"} success={false} />
    );

    expect(getByText("Failure!")).toBeInTheDocument();
  });
});
