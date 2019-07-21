import React from "react";
import "./OccupantProfile.css";

const OccupantProfile = ({ occupants, history, match }) => {
  if (!occupants || occupants.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const occupantId = match.params.occupantId;
    const occupant = occupants.find(occupant => {
      return occupant.employeeId === occupantId;
    });

    return (
      <div className="occupantProfileContainer">
        <div className="occupantProfile">
          <div
            className="occupantProfile__backButton"
            onClick={() => history.goBack()}
          >
            &lt; Back
          </div>
          <h1 className="occupantProfile__heading">{occupant.name}</h1>
          <div className="occupantProfile__employeeId">
            <h2>Employee ID</h2>
            <p>{occupant.employeeId}</p>
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
          <p className="fields__remarks">{occupant.remarks}</p>
        </div>
      </div>
    );
  }
};

export default OccupantProfile;
