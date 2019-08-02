import React from "react";
import "./ApartmentDetail.css";
import extractDate from "../../utils/ExtractDate";
import formatter from "../../utils/formatMoney";

const ApartmentDetail = ({ vacancy, capacity, name, leases, _id, history }) => {
  const [firstLeases] = leases;
  const { leaseStart, leaseEnd, monthlyRent } = firstLeases;
  return (
    <tr
      className="apartmentDetails"
      onClick={() => {
        history.push(`/apartments/${_id}`);
      }}
    >
      <td className={vacancy <= 0 ? "inverted" : "positive"}>{vacancy}</td>
      <td className="apartmentDetails__td">{name}</td>
      <td className="apartmentDetails__td">{extractDate(leaseStart)}</td>
      <td className="apartmentDetails__td">{extractDate(leaseEnd)}</td>
      <td className="apartmentDetails__td">{formatter.format(monthlyRent)}</td>
    </tr>
  );
};

export default ApartmentDetail;
