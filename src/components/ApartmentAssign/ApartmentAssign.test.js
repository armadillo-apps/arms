import React from "react";
import ApartmentAssign from "./ApartmentAssign";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("should render a search bar", () => {
  const { getByPlaceholderText } = render(<ApartmentAssign />);
  expect(getByPlaceholderText(/search occupants here/i)).toBeInTheDocument();
});
