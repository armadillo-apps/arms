import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import styles from "./SearchBar2.module.css";

const SearchBar2 = ({ id, placeholder, handleChange, value }) => {
  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        id={id}
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

SearchBar2.propTypes = {
  handleChange: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default SearchBar2;
