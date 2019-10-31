import React, { useState, useEffect } from "react";
import OccupantDetail from "../OccupantDetail/OccupantDetail";
import SearchBar from "../SearchBar/SearchBar";
import "./Occupant.css";

const Occupant = ({ occupants, history }) => {
  const [filteredOccupants, setFilteredOccupants] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
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

    setFilteredOccupants(sortedOccupantsArray);
  }, [occupants]);

  const handleNewInput = event => {
    setInputValue(event.target.value);
  };

  const handleOccupantSearch = () => {
    if (inputValue) {
      return filteredOccupants.filter(occupant => {
        return occupant.name.toLowerCase().includes(inputValue.toLowerCase());
      });
    } else {
      return filteredOccupants;
    }
  };

  return (
    <div className="occupants" data-testid="occupants">
      <div className="occupants__div">
        <h1 className="occupants__header1">Occupants</h1>
        <SearchBar handleChange={handleNewInput} placeholder="Occupant" />
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
            {handleOccupantSearch().map(occupant => {
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
