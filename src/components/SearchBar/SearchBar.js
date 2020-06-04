import React from "react";

import styles from "./SearchBar.module.css";

const SearchBar = ({ id, placeholder, handleChange, value }) => {
  return (
    <React.Fragment>
      <input
        id={id}
        type="text"
        data-testid={`${placeholder}__searchBar`}
        className={styles.searchInput}
        placeholder={`Search ${placeholder}`}
        onChange={handleChange}
        value={value}
      />
    </React.Fragment>
  );
};

export default SearchBar;
