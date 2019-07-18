import React from 'react';
import './OccupantDetail.css';

const OccupantDetail = ({ name, employeeId, findOccupant, history }) => {
  return (
    <tr
      className="occupantDetails"
      onClick={() => findOccupant(employeeId, history)}
    >
      <td className="occupantDetails__td">{name}</td>
      <td className="occupantDetails__td">{employeeId}</td>
    </tr>
  );
};

export default OccupantDetail;
