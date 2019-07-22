import React from 'react';
import extractDate from "../../utils/ExtractDate"
const Lease = ({leaseInfo : {leaseStart,leaseEnd , monthlyRent}}) => {
  return (
    <tr>
      <td>{extractDate(leaseStart)}</td>
      <td>{extractDate(leaseEnd)}</td>
      <td>{monthlyRent}</td>
    </tr>
  );
};

export default Lease;
