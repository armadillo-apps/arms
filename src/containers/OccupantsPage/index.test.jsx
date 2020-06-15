import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Occupant from "./index";
import { useFetch } from "../../hooks/useFetch";
import { mockOccupants } from "../../mocks/mockData";
import routes from "../../router/RouterPaths";

jest.mock("../../hooks/useFetch");
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

describe("Occupant", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFetch.mockReturnValue({ data: mockOccupants });
  });

  it("renders the name of occupant", () => {
    const { getByText } = render(<Occupant />);

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Bob")).toBeInTheDocument();
  });

  it("renders the employee ID of occupant", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("Employee ID")).toBeInTheDocument();
    expect(getByText("1234561b")).toBeInTheDocument();
  });

  it("renders the remarks of occupant", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("testing for Bob")).toBeInTheDocument();
  });

  it("renders the status of occupant", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("allocated")).toBeInTheDocument();
    expect(getByText("unallocated")).toBeInTheDocument();
    expect(getByText("inactive")).toBeInTheDocument();
  });

  it("render row when employeeId is not present", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("Jason")).toBeInTheDocument();
  });

  it("should attach allocated class to status ", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("allocated")).toHaveClass("allocated");
  });

  it("should attach unallocated class to status", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("unallocated")).toHaveClass("unallocated");
  });

  it("should attach inactive class to status", () => {
    const { getByText } = render(<Occupant />);
    expect(getByText("inactive")).toHaveClass("inactive");
  });

  it("should be able to filter occupants using searchbar correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Occupant />);
    const inputField = getByPlaceholderText(/search occupant/i);
    const bob = getByText("Bob");
    const jason = getByText("Jason");
    fireEvent.change(inputField, { target: { value: "b" } });
    expect(bob).toBeInTheDocument();
    expect(jason).not.toBeInTheDocument();
  });

  it("should redirect to Occupant Details Page on selection", async () => {
    const { getByText } = render(<Occupant />);
    const occupantName = getByText("Bob");

    fireEvent.click(occupantName);

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(
      `${routes.OCCUPANTS}/${mockOccupants[0]._id}`
    );
  });
});
