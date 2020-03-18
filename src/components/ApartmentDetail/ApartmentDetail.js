import React from "react";
import moment from "moment";
import styles from "./ApartmentDetail.module.css";
import extractDate from "../../utils/ExtractDate";
import { sgdFormatter, thbFormatter } from "../../utils/formatMoney";

const ApartmentDetail = ({ status, vacancy, name, leases, _id, history }) => {
  const [firstLease] = leases;

  const { leaseStart, leaseEnd, monthlyRent, currency } = firstLease;

  const leaseEndDate = extractDate(leaseEnd);

  const monthBeforeLeaseEnd = moment(new Date(leaseEndDate))
    .subtract(1, "months")
    .format("YYYY-MM-DD");

  const isLeaseExpiring = moment(new Date(Date.now())).isBetween(
    monthBeforeLeaseEnd,
    new Date(leaseEndDate)
  );

  const monthlyRentFormatted = monthlyRent => {
    if (currency === "SGD") {
      return sgdFormatter.format(monthlyRent);
    } else if (currency === "THB") {
      return thbFormatter.format(monthlyRent);
    }
  };

  return (
    <tr
      className={styles.tableRow}
      onClick={() => {
        history.push(`/apartments/${_id}`);
      }}
    >
      <td className={styles[status]}>{status}</td>
      <td className={vacancy <= 0 ? styles.inverted : styles.positive}>
        {vacancy}
      </td>
      <td>{name}</td>
      <td>{extractDate(leaseStart)}</td>
      <td
        className={isLeaseExpiring ? styles.leaseExpiring : null}
        data-testid="leaseEndDate"
      >
        {leaseEndDate}
      </td>
      <td>{monthlyRentFormatted(monthlyRent)}</td>
    </tr>
  );
};

export default ApartmentDetail;
