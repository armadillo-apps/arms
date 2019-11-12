import React from "react";
import extractDate from "../../utils/ExtractDate";
import { sgdFormatter, thbFormatter } from "../../utils/formatMoney";

const Lease = ({
  leaseInfo: { leaseStart, leaseEnd, monthlyRent, currency }
}) => {
  const monthlyRentFormatted = monthlyRent => {
    if (currency === "SGD") {
      return sgdFormatter.format(monthlyRent);
    } else if (currency === "THB") {
      return thbFormatter.format(monthlyRent);
    }
  };

  return (
    <tr>
      <td>{extractDate(leaseStart)}</td>
      <td>{extractDate(leaseEnd)}</td>
      <td>{monthlyRentFormatted(monthlyRent)}</td>
    </tr>
  );
};

export default Lease;
