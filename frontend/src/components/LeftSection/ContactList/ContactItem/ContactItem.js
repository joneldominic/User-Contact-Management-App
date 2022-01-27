import React from "react";

import { Link, useLocation } from "react-router-dom";

import styles from "./ContactItem.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const ContactItem = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const InitialsAvatar = (props) => {
    return (
      <h3 className={classNames(globalStyles["text-white"], styles.avatar)}>
        {props.name && props.name[0].toUpperCase()}
      </h3>
    );
  };

  return (
    <Link to={`/contacts/${props.contact.id}`}>
      <div
        className={`${styles.contactItem} ${
          +splitLocation[2] === props.contact.id ? styles.isActive : ""
        }`}
      >
        <InitialsAvatar name={props.contact.firstname} />
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
