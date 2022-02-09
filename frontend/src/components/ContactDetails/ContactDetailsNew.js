import React from "react";
import { useReducer, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../core/UI/Button";
import LabaledInput from "../common/LabaledInput";
import LabaledTextArea from "../common/LabaledTextArea";
import Modal from "../../core/UI/Modal";

import { addNewContact, contactActions } from "../../redux/contact-slice";
import { uiActions } from "../../redux/ui-slice";

import {
  Divider,
  ActionContainer,
  ContactDetailsContentWrapper,
  ContactEditNewContainer,
  ContactEditNewHead,
  EditNewForm,
} from "./styles";

const initialState = {
  firstname: { value: "", isValid: false, hasInput: false },
  middlename: { value: "", isValid: true, hasInput: false },
  lastname: { value: "", isValid: false, hasInput: false },
  title: { value: "", isValid: false, hasInput: false },
  email: { value: "", isValid: false, hasInput: false },
  phone: { value: "", isValid: false, hasInput: false },
  deliveryaddress: { value: "", isValid: false, hasInput: false },
  billingaddress: { value: "", isValid: true, hasInput: false },
  notes: { value: "", isValid: true, hasInput: false },
};

const NewContactReducer = (state, action) => {
  switch (action.type) {
    case "firstname":
      return {
        ...state,
        firstname: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "middlename":
      return {
        ...state,
        middlename: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "lastname":
      return {
        ...state,
        lastname: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "title":
      return {
        ...state,
        title: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
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
        },
      };
    case "phone":
      return {
        ...state,
        phone: {
          value: action.value,
          isValid: action.value.trim().length === 11,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "deliveryaddress":
      return {
        ...state,
        deliveryaddress: {
          value: action.value,
          isValid: action.value.trim().length >= 2,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "billingaddress":
      return {
        ...state,
        billingaddress: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
        },
      };
    case "notes":
      return {
        ...state,
        notes: {
          value: action.value,
          isValid: true,
          hasInput: action.value.trim().length > 0,
        },
      };
    default:
      throw Error("Something Wrong! Please Try Again");
  }
};

const ContactDetailsNew = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formIsValid, setFormIsValid] = useState(false);
  const { show: showModal, id: modalId } = useSelector(
    (state) => state.ui.modal
  );
  const { hasPending, selectedContact, isLoading } = useSelector(
    (state) => state.contact
  );

  const [formControlState, dispatchFormcontrol] = useReducer(
    NewContactReducer,
    initialState
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
        formControlState.firstname.hasInput ||
        formControlState.middlename.hasInput ||
        formControlState.lastname.hasInput ||
        formControlState.title.hasInput ||
        formControlState.email.hasInput ||
        formControlState.phone.hasInput ||
        formControlState.deliveryaddress.hasInput ||
        formControlState.billingaddress.hasInput ||
        formControlState.notes.hasInput;

      dispatch(
        contactActions.setPending({
          status: _hasPending,
          from: "contactdetailsnew",
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
    dispatchFormcontrol({ type, value });
  };

  const onSaveButtonClickHandler = () => {
    if (formIsValid) {
      const newContact = {
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

      dispatch(
        addNewContact(newContact, (id) => {
          history.replace(`/contacts/${id}`);
        })
      );
    }
  };

  const redirect = () => {
    if (selectedContact) {
      history.replace(`/contacts/${selectedContact.id}`);
    } else {
      history.replace(`/contacts`);
    }
  };

  const onCancelButtonClickHandler = () => {
    if (hasPending.status) {
      dispatch(
        uiActions.setModal({ show: true, id: "contactdetailsnew" })
      );
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
      {showModal && modalId === "contactdetailsnew" && (
        <Modal
          color="warning"
          title="Are you sure?"
          message="Inputted Data will not be save. This process cannot be undone."
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
            disabled={!formIsValid || isLoading}
            onClick={onSaveButtonClickHandler}
          >
            {!isLoading ? "Save" : "Loading..."}
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
            <ContactEditNewHead>Add Contact</ContactEditNewHead>
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

export default ContactDetailsNew;
