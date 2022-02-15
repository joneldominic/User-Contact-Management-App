import React from "react";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../../core/UI/Button";
import Modal from "../../core/UI/Modal";

import LabaledInput from "../common/LabaledInput";
import LabaledTextArea from "../common/LabaledTextArea";

import { contactActions, updateContact } from "../../redux/contact-slice";

import {
  Divider,
  ActionContainer,
  ContactDetailsContentWrapper,
  ContactEditNewContainer,
  ContactEditNewHead,
  EditNewForm,
} from "./styles";

import AppRoutes from "../../constants/app-routes";
import { uiActions } from "../../redux/ui-slice";

const editFormInitializer = (contact) => {
  const dummy = {
    value: "",
    isValid: false,
    hasInput: false,
    hasUpdate: false,
  };

  if (contact === undefined) {
    return {
      firstname: { ...dummy },
      middlename: { ...dummy },
      lastname: { ...dummy },
      title: { ...dummy },
      email: { ...dummy },
      phone: { ...dummy },
      deliveryaddress: { ...dummy },
      billingaddress: { ...dummy },
      notes: { ...dummy },
    };
  }

  return {
    firstname: {
      value: contact.firstname,
      isValid: true,
      hasInput: contact.firstname.length > 0,
      hasUpdate: false,
    },
    middlename: {
      value: contact.middlename,
      isValid: true,
      hasInput: contact.middlename.length > 0,
      hasUpdate: false,
    },
    lastname: {
      value: contact.lastname,
      isValid: true,
      hasInput: contact.lastname.length > 0,
      hasUpdate: false,
    },
    title: {
      value: contact.title,
      isValid: true,
      hasInput: contact.title.length > 0,
      hasUpdate: false,
    },
    email: {
      value: contact.email,
      isValid: true,
      hasInput: contact.email.length > 0,
      hasUpdate: false,
    },
    phone: {
      value: contact.number,
      isValid: true,
      hasInput: contact.number.length > 0,
      hasUpdate: false,
    },
    deliveryaddress: {
      value: contact.address1,
      isValid: true,
      hasInput: contact.address1.length > 0,
      hasUpdate: false,
    },
    billingaddress: {
      value: contact.address2,
      isValid: true,
      hasInput: contact.address2.length > 0,
      hasUpdate: false,
    },
    notes: {
      value: contact.notes,
      isValid: true,
      hasInput: contact.notes.length > 0,
      hasUpdate: false,
    },
  };
};

const EditContactReducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return {
        ...state,
        firstname: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.firstname !== action.value,
        },
      };
    case "middlename":
      return {
        ...state,
        middlename: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.middlename !== action.value,
        },
      };
    case "lastname":
      return {
        ...state,
        lastname: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.lastname !== action.value,
        },
      };
    case "title":
      return {
        ...state,
        title: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.title !== action.value,
        },
      };
    case "email":
      return {
        ...state,
        email: {
          value: action.value,
          isValid: action.value
            .trim()
            .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.email !== action.value,
        },
      };
    case "phone":
      return {
        ...state,
        phone: {
          value: action.value,
          isValid: action.value.trim().match(/^09[0-9]{9}$/),
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.number !== action.value,
        },
      };
    case "deliveryaddress":
      return {
        ...state,
        deliveryaddress: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.address1 !== action.value,
        },
      };
    case "billingaddress":
      return {
        ...state,
        billingaddress: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.address2 !== action.value,
        },
      };
    case "notes":
      return {
        ...state,
        notes: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
          hasUpdate: action.contact.notes !== action.value,
        },
      };
    default:
      throw Error("Something Wrong! Please Try Again");
  }
};

const ContactDetailsEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formIsValid, setFormIsValid] = useState(false);

  const contact = useSelector((state) => state.contact.selectedContact);

  const { show: showModal, id: modalId } = useSelector(
    (state) => state.ui.modal
  );

  const { hasPending, selectedContact, isLoading } = useSelector(
    (state) => state.contact
  );

  const [formControlState, dispatchFormcontrol] = useReducer(
    EditContactReducer,
    contact,
    editFormInitializer
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        formControlState.firstname.isValid &&
          formControlState.middlename.isValid &&
          formControlState.lastname.isValid &&
          formControlState.title.isValid &&
          formControlState.email.isValid &&
          formControlState.phone.isValid &&
          formControlState.deliveryaddress.isValid &&
          formControlState.billingaddress.isValid &&
          formControlState.notes.isValid
      );

      const _hasPending =
        formControlState.firstname.hasUpdate ||
        formControlState.middlename.hasUpdate ||
        formControlState.lastname.hasUpdate ||
        formControlState.title.hasUpdate ||
        formControlState.email.hasUpdate ||
        formControlState.phone.hasUpdate ||
        formControlState.deliveryaddress.hasUpdate ||
        formControlState.billingaddress.hasUpdate ||
        formControlState.notes.hasUpdate;

      dispatch(
        contactActions.setPending({
          status: _hasPending,
          from: "contactdetailsedit",
        })
      );
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    formControlState.firstname,
    formControlState.middlename,
    formControlState.lastname,
    formControlState.title,
    formControlState.email,
    formControlState.phone,
    formControlState.deliveryaddress,
    formControlState.billingaddress,
    formControlState.notes,
    dispatch,
  ]);

  const inputChangeHandler = (event) => {
    const type = event.target.id;
    const value = event.target.value;
    dispatchFormcontrol({ type, value, contact });
  };

  const onSaveButtonClickHandler = () => {
    if (formIsValid) {
      const updatedContact = {
        id: contact.id,
        firstname: formControlState.firstname.value,
        middlename: formControlState.middlename.value,
        lastname: formControlState.lastname.value,
        number: formControlState.phone.value,
        email: formControlState.email.value,
        title: formControlState.title.value,
        address1: formControlState.deliveryaddress.value,
        address2:
          formControlState.billingaddress.value.length === 0
            ? formControlState.deliveryaddress.value
            : formControlState.billingaddress.value,
        notes: formControlState.notes.value,
      };

      dispatch(updateContact(updatedContact));
    }
  };

  const redirect = () => {
    if (selectedContact) {
      history.replace(`${AppRoutes.ContactPage.path}/${selectedContact.id}`);
    } else {
      history.replace(`${AppRoutes.ContactPage.path}`);
    }
  };

  const onCancelButtonClickHandler = () => {
    if (hasPending.status) {
      dispatch(uiActions.setModal({ show: true, id: "contactdetailsedit" }));
    } else {
      redirect();
    }
  };

  const onModalConfirmClickHandler = () => {
    dispatch(
      contactActions.setPending({
        status: false,
        from: "",
      })
    );
    dispatch(uiActions.setModal({ show: false, id: "" }));
    redirect();
  };

  const onModalCancelClickHandler = () => {
    dispatch(uiActions.setModal({ show: false, id: "" }));
  };

  return (
    <>
      {showModal && modalId === "contactdetailsedit" && (
        <Modal
          color="warning"
          title="Are you sure?"
          message="Changes will not be save. This process cannot be undone."
          option1={{
            color: "primary",
            label: "Confirm",
            callback: onModalConfirmClickHandler,
          }}
          option2={{
            color: "warning",
            label: "Cancel",
            callback: onModalCancelClickHandler,
          }}
        />
      )}
      <ContactDetailsContentWrapper>
        <ActionContainer>
          <Button
            variant="outlined"
            color="success"
            disabled={!formIsValid || isLoading || !hasPending.status}
            onClick={onSaveButtonClickHandler}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="warning"
            disabled={isLoading}
            onClick={onCancelButtonClickHandler}
          >
            Cancel
          </Button>
        </ActionContainer>
        <Divider />
        <ContactEditNewContainer>
          <EditNewForm>
            <ContactEditNewHead>Edit Contact</ContactEditNewHead>
            <LabaledInput
              name="firstname"
              type="text"
              label="First Name"
              isRequired={true}
              isInvalid={
                !formControlState.firstname.isValid &&
                formControlState.firstname.hasInput
              }
              invalidFeedback="Firstname must be atleast 2 characters"
              value={formControlState.firstname.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="middlename"
              type="text"
              label="Middle Name"
              isRequired={false}
              value={formControlState.middlename.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="lastname"
              type="text"
              label="Last Name"
              isRequired={true}
              isInvalid={
                !formControlState.lastname.isValid &&
                formControlState.lastname.hasInput
              }
              invalidFeedback="Lastname must be atleast 2 characters"
              value={formControlState.lastname.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="title"
              type="text"
              label="Title"
              isRequired={true}
              isInvalid={
                !formControlState.title.isValid &&
                formControlState.title.hasInput
              }
              invalidFeedback="Title must be atleast 2 characters"
              value={formControlState.title.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="email"
              type="email"
              label="Email"
              placeholder="sample@email.com"
              isRequired={true}
              isInvalid={
                !formControlState.email.isValid &&
                formControlState.email.hasInput
              }
              invalidFeedback="Email must be a valid Email Address"
              value={formControlState.email.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="phone"
              type="number"
              label="Phone Number"
              placeholder="09XXXXXXXXX"
              isRequired={true}
              isInvalid={
                !formControlState.phone.isValid &&
                formControlState.phone.hasInput
              }
              invalidFeedback="Phone must be a valid Mobile Phone Number"
              value={formControlState.phone.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="deliveryaddress"
              type="text"
              label="Delivery Address"
              isRequired={true}
              isInvalid={
                !formControlState.deliveryaddress.isValid &&
                formControlState.deliveryaddress.hasInput
              }
              invalidFeedback="Delivery Address must be atleast 2 characters"
              value={formControlState.deliveryaddress.value}
              onChange={inputChangeHandler}
            />
            <LabaledInput
              name="billingaddress"
              type="text"
              label="Billing Address"
              placeholder="Leave Blank if the same with Delivery Address"
              isRequired={false}
              value={formControlState.billingaddress.value}
              onChange={inputChangeHandler}
            />
            <LabaledTextArea
              name="notes"
              label="Notes"
              isRequired={false}
              value={formControlState.notes.value}
              onChange={inputChangeHandler}
            />
          </EditNewForm>
        </ContactEditNewContainer>
      </ContactDetailsContentWrapper>
    </>
  );
};

export default ContactDetailsEdit;
