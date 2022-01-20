import React, { useContext } from "react";

import { useState, useEffect } from "react";
import ContactContext from "../../../../context/contact-context";
import Card from "../../../common/Card/Card";
// import Modal from "../../../common/Modal/Modal";
import NewActions from "./NewActions";

import styles from "./NewContact.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";
import { FormInputLine, TextArea } from "../../../common/FormInput/FormInput";

const NewContact = () => {
  const contactCtx = useContext(ContactContext);

  const [firstname, setFirstname] = useState("");
  const [firstnameIsValid, setFirstnameIsValid] = useState(true);
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameIsValid, setLastnameIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryAddressIsValid, setDeliveryAddressIsValid] = useState(true);
  const [billingAddress, setBillingAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFirstnameIsValid(
        firstname.trim().length === 0 || firstname.trim().length >= 2
      );
      setLastnameIsValid(
        lastname.trim().length === 0 || lastname.trim().length >= 2
      );
      setTitleIsValid(title.trim().length === 0 || title.trim().length >= 2);
      setEmailIsValid(email.trim().length === 0 || email.includes("@"));
      setPhoneNumberIsValid(
        phoneNumber.trim().length === 0 || phoneNumber.trim().length >= 10
      );
      setDeliveryAddressIsValid(
        deliveryAddress.trim().length === 0 ||
          deliveryAddress.trim().length >= 2
      );

      setFormIsValid(
        firstname.trim().length >= 2 &&
          lastname.trim().length >= 2 &&
          title.trim().length >= 2 &&
          email.includes("@") &&
          phoneNumber.trim().length >= 10 &&
          deliveryAddress.trim().length >= 2
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [firstname, lastname, title, email, phoneNumber, deliveryAddress]);

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
  const deliveryAddressChangeHandler = (event) => {
    setDeliveryAddress(event.target.value);
  };
  const billingAddressChangeHandler = (event) => {
    setBillingAddress(event.target.value);
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
      address1: deliveryAddress,
      address2: billingAddress.length === 0 ? deliveryAddress : billingAddress,
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

          <form onSubmit={() => {}}>
            <FormInputLine
              id="firstname"
              type="text"
              label="FIRST NAME"
              isInvalid={!firstnameIsValid}
              invalidFeedback="Firstname must be atleast 2 characters long"
              defaultValue={firstname}
              onChange={firstnameChangeHandler}
            />
            <FormInputLine
              id="middlename"
              type="text"
              label="MIDDLE NAME"
              defaultValue={middlename}
              onChange={middlenameChangeHandler}
            />
            <FormInputLine
              id="lastname"
              type="text"
              label="LAST NAME"
              isInvalid={!lastnameIsValid}
              invalidFeedback="Lastname must be atleast 2 characters long"
              defaultValue={lastname}
              onChange={lastnameChangeHandler}
            />
            <FormInputLine
              id="title"
              type="text"
              label="TITLE"
              isInvalid={!titleIsValid}
              invalidFeedback="Title must be atleast 2 characters long"
              defaultValue={title}
              onChange={titleChangeHandler}
            />
            <FormInputLine
              id="email"
              type="email"
              label="EMAIL"
              isInvalid={!emailIsValid}
              invalidFeedback="Invalid Email Address"
              defaultValue={email}
              onChange={emailChangeHandler}
            />
            <FormInputLine
              id="phone"
              type="text"
              label="PHONE"
              placeholder="09XXXXXXXXX"
              isInvalid={!phoneNumberIsValid}
              invalidFeedback="Invalid Phone Number"
              defaultValue={phoneNumber}
              onChange={phoneNumberChangeHandler}
            />
            <FormInputLine
              id="address1"
              type="text"
              label="DELIVERY ADDRESS"
              isInvalid={!deliveryAddressIsValid}
              invalidFeedback="Delivery Address must be atleast 2 characters long"
              defaultValue={deliveryAddress}
              onChange={deliveryAddressChangeHandler}
            />
            <FormInputLine
              id="address2"
              type="text"
              label="BILLING ADDRESS"
              placeholder="Leave Blank if same with Delivery Address"
              defaultValue={billingAddress}
              onChange={billingAddressChangeHandler}
            />
            <TextArea
              id="notes"
              rows="5"
              label="NOTES"
              defaultValue={notes}
              onChange={notesChangeHandler}
            />
          </form>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default NewContact;
