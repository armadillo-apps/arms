import React from "react";
import "./SearchBar.css";

const SearchBar = ({ id, placeholder, handleChange, value, width }) => {
  return (
    <React.Fragment>
      <input
        id={id}
        type="text"
        className="searchInput"
        placeholder={`Search ${placeholder}`}
        onChange={handleChange}
        value={value}
        style={{width}}
      />
    </React.Fragment>
  );
};

export default SearchBar;
