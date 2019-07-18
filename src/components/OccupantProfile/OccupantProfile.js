import React from "react";
import { Link } from "react-router-dom";
import "./OccupantProfile.css";

const OccupantProfile = props => {
  if (!props.occupants || props.occupants.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const occupantId = props.match.params.occupantId;
    const filteredOccupant = props.occupants.filter(occupant => {
      return occupant.employeeId === occupantId;
    });
    return (
      <div className="occupantProfileContainer">
        <Link className="apartmentProfile__backButton" to="/occupants">
          &lt; Back
        </Link>
        <table className="fields" cellSpacing="0" cellPadding="0">
          <thead className="fields__th">
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody className="fields__tb">
            <tr>
              <td>{filteredOccupant[0].name}</td>
              <td>{filteredOccupant[0].employeeId}</td>
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
        <p>{filteredOccupant[0].remarks}</p>
      </div>
    );
  }
};

export default OccupantProfile;
