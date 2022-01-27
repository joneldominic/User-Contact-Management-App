import React from "react";

import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { FaBackspace } from "react-icons/fa";

import styles from "./SearchBar.module.css";
import classNames from "classnames";

const SearchBar = (props) => {
  const searchFieldRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/contacts") {
      searchFieldRef.current.value = "";
    }
  }, [location]);

  return (
    <form className={classNames(styles.searchForm, props.className)}>
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
