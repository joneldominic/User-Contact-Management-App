import React, { useContext, useEffect } from "react";
import Card from "../../../common/Card/Card";

import { useParams } from "react-router-dom";
import { useState } from "react";

import ContactContext from "../../../../context/contact-context";

import styles from "./ContactDetailEdit.module.css";
import NoContactSelected from "../NoContactSelected/NoContactSelected";
import EditActions from "./EditActions";
import { FormInputLine, TextArea } from "../../../common/FormInput/FormInput";
import AuthContext from "../../../../context/auth-context";
import { useHistory } from "react-router-dom";
import { updateContact } from "../../../../service/contact-service";
import Toast from "../../../common/Toast/Toast";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";

const ContactDetailEdit = () => {
  const contactCtx = useContext(ContactContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const params = useParams();

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
  const [hasUpdate, setHasUpdate] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const contact = contactCtx.contactList.find(
    (_contact) => +_contact.id === +params.contactId
  );

  useEffect(() => {
    if (typeof contact == "undefined") {
      return <NoContactSelected message="Contact Not Found!" />;
    }

    setFirstname(contact.firstname);
    setMiddlename(contact.middlename);
    setLastname(contact.lastname);
    setTitle(contact.title);
    setEmail(contact.email);
    setPhoneNumber(contact.number);
    setDeliveryAddress(contact.address1);
    setBillingAddress(contact.address2);
    setNotes(contact.notes);
  }, [contact]);

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

      const _contact = contact;
      if (
        _contact.firstname !== firstname ||
        _contact.middlename !== middlename ||
        _contact.lastname !== lastname ||
        _contact.title !== title ||
        _contact.email !== email ||
        _contact.number !== phoneNumber ||
        _contact.address1 !== deliveryAddress ||
        _contact.address2 !== billingAddress ||
        _contact.notes !== notes
      ) {
        setHasUpdate(true);
      } else {
        setHasUpdate(false);
      }

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
  }, [
    firstname,
    lastname,
    title,
    email,
    phoneNumber,
    deliveryAddress,
    middlename,
    billingAddress,
    notes,
    contact,
  ]);

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
    if (formIsValid && hasUpdate) {
      setIsLoading(true);

      const updatedContact = {
        id: contact.id,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        number: phoneNumber,
        email: email,
        title: title,
        address1: deliveryAddress,
        address2: billingAddress,
        notes: notes,
      };

      updateContact(authCtx.authUser.id, updatedContact)
        .then((response) => {
          if (response.status === 201) {
            contactCtx.updateContact();
            console.log("From Contact Context On Update");
            history.replace("/contacts");
          } else {
            alert("Something Wrong! Please Try Again");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(false);
          if (err && err.response) {
            switch (err.response.status) {
              case 400:
                console.log("Invalid Contact Details");
                console.log(err.response);
                setErrorList(
                  err.response.data.apierror.subErrors.map(
                    (_error) => `${_error.field} ${_error.message}`
                  )
                );
                break;
              default:
                alert("Something Wrong! Please Try Again");
            }
          } else {
            alert("Something Wrong! Please Try Again");
          }
        });
    }
  };

  const toastCloseHandler = () => {
    setErrorList([]);
  };

  return (
    <React.Fragment>
      <EditActions
        onSaveButtonClick={onSaveButtonClickHandler}
        formIsValid={formIsValid && hasUpdate}
        isLoading={isLoading}
      />
      <Card className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.editLabelContainer}>
            <h3>Edit Contact</h3>
            <hr />
            {errorList.length !== 0 &&
              errorList.map((_err, idx) => {
                return (
                  <Toast
                    key={idx}
                    onClose={toastCloseHandler}
                    className={globalStyles["text-danger"]}
                    message={_err}
                  />
                );
              })}
          </div>
          <form>
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

export default ContactDetailEdit;
