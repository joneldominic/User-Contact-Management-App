import React, { useContext, useEffect } from "react";

import { useState } from "react";

import SearchBar from "./SearchBar/SearchBar";
import ContactList from "./ContactList/ContactList";
import ContactContext from "../../context/contact-context";

import globalStyles from "../../assets/global-styles/bootstrap.min.module.css";

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
