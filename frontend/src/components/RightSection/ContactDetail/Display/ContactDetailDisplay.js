import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import classNames from "classnames";

import NoContactSelected from "../NoContactSelected/NoContactSelected";
import SelectAction from "./SelectAction";
import Card from "../../../common/Card/Card";
import styles from "./ContactDetailDisplay.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import Modal from "../../../common/Modal/Modal";
import {
  deleteContact,
  selectContact,
} from "../../../../redux/actions/contactActions";

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
    <div className={classNames(styles.itemContainer, globalStyles.row)}>
      <div
        className={classNames(styles.itemIconContainer, globalStyles["col-4"])}
      >
        <FaEnvelope className={styles.itemIcon} />
        <span>Email</span>
      </div>
      <div
        className={classNames(
          styles.itemDetailsContainer,
          globalStyles["col-8"]
        )}
      >
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Number = (props) => {
  return (
    <div className={classNames(styles.itemContainer, globalStyles.row)}>
      <div
        className={classNames(styles.itemIconContainer, globalStyles["col-4"])}
      >
        <FaPhoneAlt className={styles.itemIcon} />
        <span>Phone</span>
      </div>
      <div
        className={classNames(
          styles.itemDetailsContainer,
          globalStyles["col-8"]
        )}
      >
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Address = (props) => {
  return (
    <div className={classNames(styles.itemContainer, globalStyles.row)}>
      <div
        className={classNames(styles.itemIconContainer, globalStyles["col-4"])}
      >
        <FaMapMarkedAlt className={styles.itemIcon} />
        <span>{props.label}</span>
      </div>
      <div
        className={classNames(
          styles.itemDetailsContainer,
          globalStyles["col-8"]
        )}
      >
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const Note = (props) => {
  return (
    <div className={classNames(styles.itemContainer, globalStyles.row)}>
      <div
        className={classNames(styles.itemIconContainer, globalStyles["col-4"])}
      >
        <FaStickyNote className={styles.itemIcon} />
        <span>Notes</span>
      </div>
      <div
        className={classNames(
          styles.itemDetailsContainer,
          globalStyles["col-8"]
        )}
      >
        <p>{props.value}</p>
      </div>
    </div>
  );
};

const ContactDetailDisplay = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact.selectedContact);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(selectContact(params.contactId));
  }, [dispatch, params]);

  if (typeof contact === "undefined") {
    return <NoContactSelected message="Contact Not Found!" />;
  }

  const onModalCancelHandler = () => {
    setShowModal(false);
  };

  const onModalDiscardHandler = () => {
    dispatch(deleteContact(params.contactId));
    history.replace("/contacts");
  };

  const onDeleteHandler = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      {showModal && (
        <Modal
          title="Warning!"
          message="Are you sure you want to Delete this Contact?"
          buttonALabel="Cancel"
          onButtonAClick={onModalCancelHandler}
          buttonBLabel="Delete"
          buttonBStyle={globalStyles["btn-danger"]}
          onButtonBClick={onModalDiscardHandler}
        />
      )}
      <SelectAction onDeleteButtonClick={onDeleteHandler} />
      <Card className={styles.mainContainer}>
        <div className={styles.content}>
          <Header
            name={`${contact.firstname} ${contact.middlename} ${contact.lastname}`}
            title={contact.title}
          />
          <hr />
          <div className={globalStyles.col}>
            <Email value={contact.email} />
            <Number value={contact.number} />
            <Address value={contact.address1} label="Delivery Address" />
            <Address value={contact.address2} label="Billing Address" />
            <Note value={contact.notes} />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ContactDetailDisplay;
