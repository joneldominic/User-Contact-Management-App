import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../common/Card/Card";
import { FaEnvelope } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";

import NoContactSelected from "../NoContactSelected/NoContactSelected";
import SelectAction from "./SelectAction";
import ContactContext from "../../../../context/contact-context";

import styles from "./ContactDetailDisplay.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const Header = (props) => {
  return (
    <div className={styles.contactHeaderContainer}>
      <h3 className={classNames(globalStyles["text-white"], styles.avatar)}>
        {props.name && props.name[0].toUpperCase()}
      </h3>
      <div>
        <h3 className={styles.contactHeaderContactName}>{props.name}</h3>
        <h3 className={styles.contactHeaderContactTitle}>{props.title}</h3>
      </div>
    </div>
  );
};

const Email = (props) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemIconContainer}>
        <FaEnvelope />
      </div>
      <div className={styles.itemDetailsContainer}>
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Number = (props) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemIconContainer}>
        <FaPhoneAlt />
      </div>
      <div className={styles.itemDetailsContainer}>
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Address = (props) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemIconContainer}>
        <FaMapMarkedAlt />
      </div>
      <div className={styles.itemDetailsContainer}>
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Note = (props) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemIconContainer}>
        <FaStickyNote />
      </div>
      <div className={styles.itemDetailsContainer}>
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const ContactDetailDisplay = () => {
  const params = useParams();
  const contactCtx = useContext(ContactContext);
  const contact = contactCtx.getContact(params.contactId);

  if (typeof contact == "undefined") {
    return <NoContactSelected message="Contact Not Found!" />;
  }

  return (
    <React.Fragment>
      <SelectAction />
      <Card className={styles.mainContainer}>
        <div className={styles.content}>
          <Header
            name={`${contact.firstname} ${contact.middlename} ${contact.lastname}`}
            title={contact.title}
          />
          <hr />
          <Email value={contact.email} />
          <Number value={contact.number} />
          <Address value={contact.address} />
          <Note value={contact.notes} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ContactDetailDisplay;
