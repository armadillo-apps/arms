import React from "react";
import styles from "./index.module.scss";
import { formatDate, isEmpty } from "../../../utils/utils";
import { occupantsCardContent as content } from "../constants";

const OccupantsCard = ({ stayHistory, dataTestId }) => {
  return (
    <div className={styles.occupantsCard} data-testid={dataTestId}>
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
          {isEmpty(stayHistory) ? (
            <tr>
              <td>{content.emptyMessage}</td>
            </tr>
          ) : (
            stayHistory.map(stay => (
              <tr key={stay._id}>
                <td>{stay.occupantName}</td>
                <td>{formatDate(stay.checkInDate)}</td>
                <td>{formatDate(stay.checkOutDate)}</td>
                <td>{stay.occupantRemarks}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OccupantsCard;
