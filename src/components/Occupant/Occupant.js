import React from "react";
import OccupantDetail from "../OccupantDetail/OccupantDetail";
import SearchBar from "../SearchBar/SearchBar";
import "./Occupant.css";

const Occupant = ({ occupants, history }) => {
  const sortedOccupants = occupants.reduce(
    (accumulator, occupant) => {
      switch (occupant.status) {
        case "inactive":
          accumulator.inactive.push(occupant);
          return accumulator;
        case "unallocated":
          accumulator.unallocated.push(occupant);
          return accumulator;
        case "allocated":
          accumulator.allocated.push(occupant);
          return accumulator;
        default:
          return accumulator;
      }
    },
    { inactive: [], unallocated: [], allocated: [] }
  );

  const sortedOccupantsArray = [
    ...sortedOccupants.unallocated,
    ...sortedOccupants.allocated,
    ...sortedOccupants.inactive
  ];
  return (
    <div className="occupants" data-testid="occupants">
      <div className="occupants__div">
        <h1 className="occupants__header1">Occupants</h1>
        <SearchBar placeholder="Occupant" />
        <table className="occupants__table" cellSpacing="0" cellPadding="0">
          <thead className="occupants__header2">
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Remarks</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {sortedOccupantsArray.map(occupant => {
              return (
                <OccupantDetail
                  key={occupant._id}
                  name={occupant.name}
                  occupantId={occupant._id}
                  employeeId={occupant.employeeId}
                  remarks={occupant.remarks}
                  status={occupant.status}
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
