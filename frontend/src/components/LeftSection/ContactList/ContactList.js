import React from "react";

import Card from "../../common/Card/Card";
import ContactItem from "./ContactItem/ContactItem";

import styles from "./ContactList.module.css";

const NoContactFound = () => {
  return (
    <div className={styles.noContactFound}>
      <h3>No Contact Found</h3>
    </div>
  );
};

const ContactList = (props) => {
  return (
    <Card className={styles.container}>
      {props.contactList.length > 0 ? (
        props.contactList.map((_contact) => (
          <ContactItem key={_contact.id} contact={_contact} />
        ))
      ) : (
        <NoContactFound />
      )}
    </Card>
  );
};

export default ContactList;
