import React from "react";

import styles from "./OccupantDetail.module.css";

const OccupantDetail = ({
  name,
  employeeId,
  history,
  occupantId,
  remarks,
  status
}) => {
  return (
    <tr
      className={styles.tableRow}
      onClick={() => history.push(`occupants/${occupantId}`)}
    >
      <td className={styles[status]}>{status}</td>
      <td>{name}</td>
      <td>{remarks}</td>
      <td>{employeeId}</td>
    </tr>
  );
};

export default OccupantDetail;
