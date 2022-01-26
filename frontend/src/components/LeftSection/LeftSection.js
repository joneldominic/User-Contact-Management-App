import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar/SearchBar";
import ContactList from "./ContactList/ContactList";

import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";

const LeftSection = (props) => {
  const contactList = useSelector((state) => state.contact.contacts);
  const [filteredContactList, setFilteredContactList] = useState([]);

  useEffect(() => {
    console.log("Loaded Contact List");
    setFilteredContactList(contactList);
  }, [contactList]);

  const onSearchHandler = (event) => {
    setFilteredContactList(
      contactList.filter((_contact) => {
        return `${_contact.firstname} ${_contact.middlename} ${_contact.lastname}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  };

  const onClearFilterHandler = (_) => {
    setFilteredContactList(contactList);
  };

  return (
    <div className={`${props.className}`}>
      <SearchBar
        className={globalStyles["my-4"]}
        onChange={onSearchHandler}
        onClear={onClearFilterHandler}
      />
      <ContactList contactList={filteredContactList} />
    </div>
  );
};

export default LeftSection;
