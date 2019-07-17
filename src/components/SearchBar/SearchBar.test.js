import React from "react";
import SearchBar from "./SearchBar";
import "@testing-library/react/cleanup-after-each";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders apartments search bar", () => {
  const { getByPlaceholderText } = render(
    <SearchBar placeholder="Apartment" />
  );
  expect(getByPlaceholderText(/search apartment/i)).toBeInTheDocument();
});

it("renders occupants search bar", () => {
  const { getByPlaceholderText } = render(<SearchBar placeholder="Occupant" />);
  expect(getByPlaceholderText(/search occupant/i)).toBeInTheDocument();
});
