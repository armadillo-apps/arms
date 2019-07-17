import React from 'react';
import './OccupantDetail.css';

const OccupantDetail = ({ name, employeeId }) => {
  return (
    <tr className="occupantDetails">
      <td className="occupantDetails__td">{name}</td>
      <td className="occupantDetails__td">{employeeId}</td>
    </tr>
  );
};

export default OccupantDetail;
