import React from "react";
import "./ApartmentDetail.css";
import extractDate from "../../utils/ExtractDate";
import formatter from "../../utils/formatMoney";
import moment from "moment";

const ApartmentDetail = ({
  status,
  vacancy,
  capacity,
  name,
  leases,
  _id,
  history
}) => {
  const [firstLeases] = leases;
  const { leaseStart, leaseEnd, monthlyRent } = firstLeases;
  const leaseEndDate = extractDate(leaseEnd);
  const monthBeforeLeaseEnd = moment(new Date(leaseEndDate))
    .subtract(1, "months")
    .format("YYYY-MM-DD");

  const leaseEndAlertBoolean = moment(new Date()).isBetween(
    monthBeforeLeaseEnd,
    new Date(leaseEndDate)
  );

  const leaseEndAlert = boolean => (boolean ? "leaseEndAlert" : "");
  return (
    <tr
      className="apartmentDetails"
      onClick={() => {
        history.push(`/apartments/${_id}`);
      }}
    >
      <td
        className={`apartmentDetails__td ${status} ${leaseEndAlert(
          leaseEndAlertBoolean
        )}`}
      >
        {status}
      </td>
      <td className={vacancy <= 0 ? "inverted" : "positive"}>{vacancy}</td>
      <td className="apartmentDetails__td">{name}</td>
      <td className="apartmentDetails__td">{extractDate(leaseStart)}</td>
      <td
        className={`apartmentDetails__td ${leaseEndAlert(
          leaseEndAlertBoolean
        )}`}
      >
        {leaseEndDate}
      </td>
      <td className="apartmentDetails__td">{formatter.format(monthlyRent)}</td>
    </tr>
  );
};

export default ApartmentDetail;
