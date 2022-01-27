import React from "react";
import { useSelector } from "react-redux";

import Card from "../../common/Card/Card";
import ContactItem from "./ContactItem/ContactItem";

import styles from "./ContactList.module.css";

const NoContactFound = ({ message }) => {
  return (
    <div className={styles.noContactFound}>
      <h3>{message}</h3>
    </div>
  );
};

const ContactList = (props) => {
  const isLoading = useSelector((state) => state.contact.isLoading);

  if (isLoading) {
    return <NoContactFound message="Loading..." />;
  }
  return (
    <Card className={styles.container}>
      {props.contactList.length > 0 ? (
        <div className={styles.content}>
          {props.contactList.map((_contact) => (
            <ContactItem key={_contact.id} contact={_contact} />
          ))}
        </div>
      ) : (
        <NoContactFound message="No Contact Found" />
      )}
    </Card>
  );
};

export default ContactList;
