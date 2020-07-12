import React from "react";
import styles from "./index.module.scss";
import { leaseCardContent as content } from "../constants";
import { formatDate, isEmpty } from "../../../utils/utils";
import { formatRentWithCurrency } from "../../../utils/formatRentWithCurrency";

const LeaseCard = ({ leases, dataTestId }) => {
  return (
    <div className={styles.leaseCard} data-testid={dataTestId}>
      <h2>{content.title}</h2>
      <table>
        <thead>
          <tr>
            {content.headings.map(heading => (
              <th key={`${heading.toLowerCase()}-heading`}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty(leases) ? (
            <tr>
              <td>{content.emptyMessage}</td>
            </tr>
          ) : (
            leases.map(lease => (
              <tr key={lease._id}>
                <td>{formatDate(lease.leaseStart)}</td>
                <td>{formatDate(lease.leaseEnd)}</td>
                <td>
                  {formatRentWithCurrency(lease.monthlyRent, lease.currency)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaseCard;
