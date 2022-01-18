import React from "react";

import { useRef } from "react";

import { useLocation } from "react-router-dom";

import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { FaBackspace } from "react-icons/fa";

const SearchBar = (props) => {
  const searchFieldRef = useRef();
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    if (pathname === "/contacts") {
      searchFieldRef.current.value = "";
    }
  }, [location]);

  return (
    <form className={styles.searchForm}>
      <FaSearch className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search Contact"
        ref={searchFieldRef}
        onChange={props.onChange}
      />
      <FaBackspace
        className={styles.clearIcon}
        onClick={() => {
          searchFieldRef.current.value = "";
          props.onClear();
        }}
      />
    </form>
  );
};

export default SearchBar;
