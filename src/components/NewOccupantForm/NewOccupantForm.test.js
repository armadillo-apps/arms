import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  getByText,
  getByPlaceholderText,
  getByLabelText
} from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
// import { Toggle } from "./toggle";
import NewOccupantForm from "./NewOccupantForm";

describe("Input form", () => {
  it("should have input area for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Name")).toBeInTheDocument();
  });
});
