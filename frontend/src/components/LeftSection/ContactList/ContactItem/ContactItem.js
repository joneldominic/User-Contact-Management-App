import React from "react";

import { Link, useLocation } from "react-router-dom";

import styles from "./ContactItem.module.css";

const ContactItem = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Link to={`/contacts/${props.contact.id}`}>
      <div
        className={`${styles.contactItem} ${
          +splitLocation[2] === props.contact.id ? styles.isActive : ""
        }`}
      >
        <img
          src={require("../../../../assets/images/img_avatar.png").default}
          alt="Avatar"
          className={styles.avatar}
        />
        <div>
          <h3
            className={styles.contactName}
          >{`${props.contact.firstname} ${props.contact.middlename} ${props.contact.lastname}`}</h3>
          <h3 className={styles.contactTitle}>{props.contact.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ContactItem;
