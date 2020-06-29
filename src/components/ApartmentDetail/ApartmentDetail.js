import React from "react";
import styles from "./ApartmentDetail.module.css";
import extractDate from "../../utils/ExtractDate";
import { useHistory } from "react-router-dom";
import { checkLeaseExpiry } from "../../utils/checkLeaseExpiry";
import { formatRentWithCurrency } from "../../utils/formatRentWithCurrency";
import routes from "../../router/RouterPaths";

const ApartmentDetail = ({ apartment, vacancy }) => {
  const history = useHistory();
  const { status, name, leases, _id } = apartment;

  const latestLeast = leases[0];
  const { leaseStart, leaseEnd, monthlyRent, currency } = latestLeast;

  const leaseEndDate = extractDate(leaseEnd);
  const isLeaseExpiring = checkLeaseExpiry(leaseEnd);

  const rentWithCurrency = formatRentWithCurrency(monthlyRent, currency);

  return (
    <tr
      className={styles.tableRow}
      onClick={() => {
        history.push(`${routes.APARTMENTS}/${_id}`);
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
      <td>{rentWithCurrency}</td>
    </tr>
  );
};

export default ApartmentDetail;
