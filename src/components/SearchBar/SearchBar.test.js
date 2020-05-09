import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "./SearchBar";

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
