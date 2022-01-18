import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../../../common/Card/Card";
import { FaEnvelope } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";

import styles from "./ContactDetailDisplay.module.css";
import NoContactSelected from "../NoContactSelected/NoContactSelected";
import SelectAction from "./SelectAction";
import ContactContext from "../../../../context/contact-context";

const Header = (props) => {
  return (
    <div className={styles.contactHeaderContainer}>
      <img
        src={require("../../../../assets/images/img_avatar.png").default}
        alt="Avatar"
        className={styles.contactHeaderAvatar}
      />
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
  const contact = contactCtx.getContact(params.contactId)

  if (typeof contact == "undefined") {
    return <NoContactSelected message="Contact Not Found!" />;
  }

  return (
    <React.Fragment>
      <SelectAction />
      <hr className={styles.divider} />
      <Card className={styles.mainContainer}>
        <Header
          name={`${contact.firstname} ${contact.middlename} ${contact.lastname}`}
          title={contact.title}
        />
        <hr />
        <Email value={contact.email} />
        <Number value={contact.number} />
        <Address value={contact.address} />
        <Note value={contact.notes} />
      </Card>
    </React.Fragment>
  );
};

export default ContactDetailDisplay;

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
