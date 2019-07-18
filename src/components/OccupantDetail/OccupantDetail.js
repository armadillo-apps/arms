import React from "react";
import "./OccupantDetail.css";

const OccupantDetail = ({ name, employeeId, history }) => {
  return (
    <tr
      className="occupantDetails"
      onClick={() => history.push(`occupants/${employeeId}`)}
    >
      <td className="occupantDetails__td">{name}</td>
      <td className="occupantDetails__td">{employeeId}</td>
    </tr>
  );
};

export default OccupantDetail;
