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
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {occupants.map(occupant => {
              return (
                <OccupantDetail
                  key={occupant.employeeId}
                  name={occupant.name}
                  employeeId={occupant.employeeId}
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
