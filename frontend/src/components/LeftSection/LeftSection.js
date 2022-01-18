import React, { useContext, useEffect } from "react";

import { useState } from "react";

import SearchBar from "./SearchBar/SearchBar";
import ContactList from "./ContactList/ContactList";

import styles from "./LeftSection.module.css";
import ContactContext from "../../context/contact-context";

const LeftSection = (props) => {
  const contactCtx = useContext(ContactContext);
  const [filteredContactList, setContactList] = useState([]);

  useEffect(() => {
    console.log("Loaded Contact List");
    setContactList(contactCtx.contactList);
  }, [contactCtx]);

  const onSearchHandler = (event) => {
    setContactList(
      contactCtx.contactList.filter((_contact) => {
        return `${_contact.firstname} ${_contact.middlename} ${_contact.lastname}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  };

  const onClearFilterHandler = (_) => {
    setContactList(contactCtx.contactList);
  };

  return (
    <div className={`${props.className}`}>
      <SearchBar onChange={onSearchHandler} onClear={onClearFilterHandler} />
      <hr className={styles.divider} />
      <ContactList contactList={filteredContactList} />
    </div>
  );
};

export default LeftSection;

// const DUMMY_CONTACTS = [
//   {
//     id: 6,
//     firstname: "contact 1-0",
//     middlename: "middle 1-0",
//     lastname: "last 1-0",
//     number: "09000000000",
//     email: "contact0@test.com",
//     title: "Contact for 0",
//     address: "Street 0",
//     notes: "Notes0",
//   },
//   {
//     id: 7,
//     firstname: "contact 1-1",
//     middlename: "middle 1-1",
//     lastname: "last 1-1",
//     number: "09000000001",
//     email: "contact1@test.com",
//     title: "Contact for 1",
//     address: "Street 1",
//     notes: "Notes1",
//   },
//   {
//     id: 8,
//     firstname: "contact 1-2",
//     middlename: "middle 1-2",
//     lastname: "last 1-2",
//     number: "09000000002",
//     email: "contact2@test.com",
//     title: "Contact for 2",
//     address: "Street 2",
//     notes: "Notes2",
//   },
// ];
