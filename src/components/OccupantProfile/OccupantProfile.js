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
        <div className="occupantProfile">
          <Link className="occupantProfile__backButton" to="/occupants">
            &lt; Back
          </Link>
          <h1 className="occupantProfile__heading">{filteredOccupant[0].name}</h1>
          <div className="occupantProfile__employeeId">
            <h2>Employee Id</h2>
            <p>{filteredOccupant[0].employeeId}</p>
          </div>
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
          <p className="fields__remarks">{filteredOccupant[0].remarks}</p>
        </div>
      </div>
    );
  }
};

export default OccupantProfile;
