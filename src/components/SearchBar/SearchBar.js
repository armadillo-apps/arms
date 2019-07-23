import React from "react";
import "./SearchBar.css";

const SearchBar = ({ id, placeholder, handleChange }) => {
  return (
    <React.Fragment>
      <input
        id={id}
        type="text"
        className="searchInput"
        placeholder={`Search ${placeholder}`}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default SearchBar;
