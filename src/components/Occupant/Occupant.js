import React from "react";
import OccupantDetail from "../OccupantDetail/OccupantDetail";
import SearchBar from "../SearchBar/SearchBar";
import "./Occupant.css";

const Occupant = ({ occupants, history }) => {
  return (
    <div className="occupants" data-testid="occupants">
      <div className="occupants__div">
        <h1 className="occupants__header1">Occupants</h1>
        <SearchBar placeholder="Occupant" />
        <table className="occupants__table" cellSpacing="0" cellPadding="0">
          <thead className="occupants__header2">
            <tr>
              <th>Name</th>
              <th>Remarks</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {occupants.map(occupant => {
              return (
                <OccupantDetail
                  key={occupant._id}
                  name={occupant.name}
                  occupantId={occupant._id}
                  employeeId={occupant.employeeId}
                  remarks={occupant.remarks}
                  history={history}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Occupant;
