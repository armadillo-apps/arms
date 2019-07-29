import React from "react";
import "./OccupantProfile.css";

const OccupantProfile = ({ occupants, history, match }) => {
  if (!occupants || occupants.length < 1) {
    return <h1>Loading...</h1>;
  } else {
    const occupantId = match.params.occupantId;
    const occupant = occupants.find(occupant => {
      return occupant._id === occupantId;
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
          <div className="occupantProfile__header1Container">
            <h1 className="occupantProfile__header1">{occupant.name}</h1>
            <span className={occupant.status}>{occupant.status}</span>
          </div>
          <div className="occupantProfile__employeeId">
            <h2 className="occupantProfile__header2">Employee ID</h2>
            <p>{occupant.employeeId}</p>
          </div>
          <h1 className="occupantProfile__header2">Stay History</h1>
          <table className="stayHistory__table">
            <thead className="stayHistory__headers">
              <tr>
                <th>Apartment Name </th>
                <th>Check In </th>
                <th>Check Out</th>
                <th>Monthly Rental</th>
              </tr>
            </thead>
          </table>
          <h1 className="occupantProfile__header2">Remarks</h1>
          <p className="remarks__body">{occupant.remarks}</p>
        </div>
      </div>
    );
  }
};

export default OccupantProfile;
