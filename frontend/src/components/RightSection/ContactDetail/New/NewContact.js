import React, { useContext } from "react";

import { useState } from "react";
import ContactContext from "../../../../context/contact-context";
import Card from "../../../common/Card/Card";
// import Modal from "../../../common/Modal/Modal";
import NewActions from "./NewActions";

import styles from "./NewContact.module.css";

const NewContact = () => {
  const contactCtx = useContext(ContactContext);

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const firstnameChangeHandler = (event) => {
    setFirstname(event.target.value);
  };
  const middlenameChangeHandler = (event) => {
    setMiddlename(event.target.value);
  };
  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const phoneNumberChangeHandler = (event) => {
    setPhoneNumber(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const notesChangeHandler = (event) => {
    setNotes(event.target.value);
  };

  const onSaveButtonClickHandler = () => {
    const newContact = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      number: phoneNumber,
      email: email,
      title: title,
      address: address,
      notes: notes,
    };

    console.log(newContact);
    contactCtx.createContact(newContact);
    console.log("Save Data From NewContact Component");
  };

  return (
    <React.Fragment>
      {/* <Modal
        title="Test"
        message="Error Message"
        onConfirm={() => {}}
        className={styles.errorModal}
      /> */}
      <NewActions onSaveButtonClick={onSaveButtonClickHandler} />
      <Card className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.editLabelContainer}>
            <h3>New Contact</h3>
            <hr />
          </div>
          <form>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="firstname">FIRST NAME</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="firstname"
                  defaultValue={firstname}
                  onChange={firstnameChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="middlename">MIDDLE NAME</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="middlename"
                  defaultValue={middlename}
                  onChange={middlenameChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="lastname">LAST NAME</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="lastname"
                  defaultValue={lastname}
                  onChange={lastnameChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="title">TITLE</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="title"
                  defaultValue={title}
                  onChange={titleChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="email">EMAIL</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="email"
                  type="email"
                  defaultValue={email}
                  onChange={emailChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="phone">PHONE</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="phone"
                  defaultValue={phoneNumber}
                  onChange={phoneNumberChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="address">ADDRESS</label>
              </div>
              <div className={styles.controlInputContainer}>
                <input
                  id="address"
                  defaultValue={address}
                  onChange={addressChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlContainer}>
              <div className={styles.controlLabelContainer}>
                <label htmlFor="notes">NOTES</label>
              </div>
              <div className={styles.controlInputContainer}>
                <textarea
                  id="notes"
                  rows="5"
                  defaultValue={notes}
                  onChange={notesChangeHandler}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default NewContact;
