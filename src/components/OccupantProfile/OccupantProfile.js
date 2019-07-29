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
            <span className={`occupantProfile__status ${occupant.status}`}>{occupant.status}</span>
            <button className="occupantProfile__editDetailsButton">Edit</button>
          </div>
          <div className="occupantProfile__detailsContainer">
            <h2 className="occupantProfile__details">{occupant.employeeId}</h2>
            <h2 className="occupantProfile__details">Gender: {occupant.gender}</h2>
            <h2 className="occupantProfile__details">Country: {occupant.country}</h2>
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
