import React from "react";
import SearchBar from "../SearchBar/SearchBar";

const OccupantAssign = ({ occupants, handleChange, filter }) => {
  return (
    <React.Fragment>
      <SearchBar
        placeholder="occupants here..."
        id="occupantAssignValue"
        handleChange={handleChange}
      />
      <div>{(occupants, value) => filter(occupants, value).map()}</div>
    </React.Fragment>
  );
};

export default OccupantAssign;
