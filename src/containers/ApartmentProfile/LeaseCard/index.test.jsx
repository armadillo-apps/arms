import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LeaseCard from "../LeaseCard";
import { mockApartment } from "../../../mocks/mockData";
import { leaseCardContent as content } from "../constants";
import { formatDate } from "../../../utils/utils";

describe("Lease Card", () => {
  it("should attach data-testid when passed as a prop", () => {
    render(<LeaseCard dataTestId="leaseCard" />);

    expect(screen.getByTestId("leaseCard")).toBeInTheDocument();
  });

  it("should render title", () => {
    render(<LeaseCard leases={mockApartment.leases} />);

    expect(screen.getByText(content.title)).toBeInTheDocument();
  });

  it("should render headings", () => {
    render(<LeaseCard leases={mockApartment.leases} />);

    content.headings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("should render leases", () => {
    render(<LeaseCard leases={mockApartment.leases} />);

    mockApartment.leases.forEach(lease => {
      expect(
        screen.getByText(formatDate(lease.leaseStart))
      ).toBeInTheDocument();
      expect(screen.getByText(formatDate(lease.leaseEnd))).toBeInTheDocument();
      expect(screen.getByText("THB 5,000.00")).toBeInTheDocument();
    });
  });

  it("should render no leases message when there are no leases", () => {
    render(<LeaseCard />);

    expect(
      screen.queryByText(formatDate(mockApartment.leases[0].leaseStart))
    ).not.toBeInTheDocument();
    expect(screen.getByText(content.emptyMessage)).toBeInTheDocument();
  });
});
