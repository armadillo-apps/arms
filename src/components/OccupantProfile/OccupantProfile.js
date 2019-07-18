import React from 'react';
import './OccupantProfile.css';
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
        <tbody className="fields__tb">
          <tr>
            <td>Bob</td>
            <td>121213a</td>
          </tr>
        </tbody>
      </table>
      <h1 className="fields__headings">Apartments</h1>
      <table className="fields">
        <thead className="fields__th">
          <tr>
            <th>Address</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
      </table>
      <h1 className="fields__headings">Remarks</h1>
      <textarea rows="5" cols="50" size="19" className="fields__textarea">
        Add Remarks Here
      </textarea>
      <button className="fields__button">Add Remarks</button>
    </div>
  );
};

export default OccupantProfile;
