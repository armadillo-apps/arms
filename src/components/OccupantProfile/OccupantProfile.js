import React from 'react';

const OccupantProfile = ({ name, employeeId }) => {
  return (
    <div>
      <table className="fields" cellSpacing="0" cellPadding="0">
        <thead className="fields__th">
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bob</td>
            <td>121213a</td>
          </tr>
        </tbody>
      </table>
      <h2>Apartments</h2>
      <table className="fields">
        <thead className="fields__th">
          <tr>
            <th>Address</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
      </table>
      {/* apartments */}
      <label className="occupantProfile__label">Remarks</label>
      <input type="text" className="occupantProfile__input" />
    </div>
  );
};

export default OccupantProfile;
