import React from "react";
import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import ApartmentProfileCard from "./ApartmentProfileCard";

describe("Apartment Profile Card", () => {
  it("should render card", () => {
    const { getByTestId } = render(
      <ApartmentProfileCard id="card" heading="HEADING" />
    );

    expect(getByTestId("card")).toBeInTheDocument();
  });

  it("should render remarks heading", () => {
    const { getByText } = render(
      <ApartmentProfileCard id="card" heading="HEADING" />
    );

    expect(getByText("HEADING")).toBeInTheDocument();
  });
});
