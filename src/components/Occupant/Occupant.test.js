import React from "react";
import Occupant from "./Occupant";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import * as data from "../../api/api";

jest.spyOn(data, "fetchOccupants").mockImplementation(() => {
  return [
    {
      name: "Jesstern",
      employeeId: "1234561b"
    },
    {
      name: "Elson",
      employeeId: "1234562b"
    }
  ];
});

describe("Occupant", () => {
  it("/occupants should GET a list of occupants", async () => {
    const { getByText } = render(<Occupant />);
    await waitForElement(() => getByText("Jesstern"));
    expect(getByText("Jesstern")).toBeInTheDocument();
    expect(getByText("Elson")).toBeInTheDocument();
  });
});
