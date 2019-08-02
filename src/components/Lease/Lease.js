import React from "react";
import extractDate from "../../utils/ExtractDate";
import formatter from "../../utils/formatMoney";

const Lease = ({ leaseInfo: { leaseStart, leaseEnd, monthlyRent } }) => {
  return (
    <tr>
      <td>{extractDate(leaseStart)}</td>
      <td>{extractDate(leaseEnd)}</td>
      <td>{formatter.format(monthlyRent)}</td>
    </tr>
  );
};

export default Lease;
