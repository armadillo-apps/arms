import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Occupants from "./index";
import { useFetch } from "../../hooks/useFetch";
import { mockOccupants } from "../../mocks/mockData";
import routes from "../../router/RouterPaths";
import * as UserContext from "../../context/UserContext";

jest.mock("../../hooks/useFetch");
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockHistory })
}));

function renderOccupant(user) {
  jest.spyOn(UserContext, "useUserContext").mockImplementation(() => ({
    state: user,
    dispatch: jest.fn()
  }));

  const utils = render(<Occupants />);
  return { ...utils };
}

describe("Occupant", () => {
  const guestUser = {
    role: "guest"
  };

  const adminUser = {
    role: "admin"
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useFetch.mockReturnValue({ data: mockOccupants });
  });

  it("renders the name of occupant", () => {
    const { getByText } = renderOccupant(guestUser);

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Bob")).toBeInTheDocument();
  });

  it("renders the employee ID of occupant", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("Employee ID")).toBeInTheDocument();
    expect(getByText("1234561b")).toBeInTheDocument();
  });

  it("renders the remarks of occupant", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("Remarks")).toBeInTheDocument();
    expect(getByText("testing for Bob")).toBeInTheDocument();
  });

  it("renders the status of occupant", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("Status")).toBeInTheDocument();
    expect(getByText("allocated")).toBeInTheDocument();
    expect(getByText("unallocated")).toBeInTheDocument();
    expect(getByText("inactive")).toBeInTheDocument();
  });

  it("render row when employeeId is not present", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("Jason")).toBeInTheDocument();
  });

  it("should attach allocated class to status ", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("allocated")).toHaveClass("allocated");
  });

  it("should attach unallocated class to status", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("unallocated")).toHaveClass("unallocated");
  });

  it("should attach inactive class to status", () => {
    const { getByText } = renderOccupant(guestUser);
    expect(getByText("inactive")).toHaveClass("inactive");
  });

  it("should be able to filter occupants using searchbar correctly", () => {
    const { getByPlaceholderText, getByText } = renderOccupant(guestUser);
    const inputField = getByPlaceholderText(/search occupant/i);
    const bob = getByText("Bob");
    const jason = getByText("Jason");
    fireEvent.change(inputField, { target: { value: "b" } });
    expect(bob).toBeInTheDocument();
    expect(jason).not.toBeInTheDocument();
  });

  it("should redirect to Occupant Details Page on selection", async () => {
    const { getByText } = renderOccupant(guestUser);
    const occupantName = getByText("Bob");

    fireEvent.click(occupantName);

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(
      `${routes.OCCUPANTS}/${mockOccupants[0]._id}`
    );
  });

  it("should redirect to create new occupant page on click", () => {
    const { getByText } = renderOccupant(adminUser);
    const addOccupantButton = getByText("+ Add Occupant");

    fireEvent.click(addOccupantButton);

    expect(mockHistory).toBeCalledTimes(1);
    expect(mockHistory).toBeCalledWith(routes.NEW_OCCUPANT);
  });

  it("should not show guest the link to create new occupant page", () => {
    const { queryByText } = renderOccupant(guestUser);
    const addOccupantButton = queryByText("+ Add Occupant");

    expect(addOccupantButton).not.toBeInTheDocument();
  });
});
