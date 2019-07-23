import React from "react";
import "./SearchBar.css";

const SearchBar = ({ id, placeholder, handleChange, value }) => {
  return (
    <React.Fragment>
      <input
        id={id}
        type="text"
        className="searchInput"
        placeholder={`Search ${placeholder}`}
        onChange={handleChange}
        value={value}
      />
    </React.Fragment>
  );
};

export default SearchBar;
