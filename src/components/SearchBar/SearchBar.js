import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        className="searchInput"
        placeholder={`Search ${placeholder}`}
      />
    </React.Fragment>
  );
};

export default SearchBar;
