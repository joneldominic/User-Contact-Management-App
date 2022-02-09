import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaMap,
  FaStickyNote,
} from "react-icons/fa";

import Button from "../../core/UI/Button";
import Avatar from "../../core/UI/Avatar";
import Modal from "../../core/UI/Modal";

import NoContactSelected from "./NoContactSelected";

import AppRoutes from "../../constants/app-routes";

import {
  Divider,
  ContactDetailsContentWrapper,
  ViewActionContainer,
  ContactViewContainer,
  ContactViewHead,
  ContactViewName,
  ContactViewTitle,
  DetailItemsWrapper,
  DetailItemWrapper,
  IconLabelWrapper,
  DetailItemInfo,
  DetailItemNote,
} from "./styles";

import { contactActions, deleteContact } from "../../redux/contact-slice";
import { uiActions } from "../../redux/ui-slice";

const ContactDetailsView = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.contact.selectedContact);

  const { show: showModal, id: modalId } = useSelector(
    (state) => state.ui.modal
  );

  useEffect(() => {
    dispatch(contactActions.selectContact(params.contactId));
  }, [dispatch, params]);

  if (!contact) {
    return <NoContactSelected />;
  }

  const onEditButtonClickHandler = () => {
    history.replace(`${AppRoutes.ContactPage.path}/${contact.id}/edit`);
  };

  const onDeleteButtonClickHandler = () => {
    dispatch(uiActions.setModal({ show: true, id: "contactdetailsview" }));
  };

  const onModalConfirmClickHandler = () => {
    dispatch(deleteContact(contact.id));
    dispatch(uiActions.setModal({ show: false, id: "" }));
    history.replace(`${AppRoutes.ContactPage.path}`);
  };

  const onModalCancelClickHandler = () => {
    dispatch(uiActions.setModal({ show: false, id: "" }));
  };

  return (
    <>
      {showModal && modalId === "contactdetailsview" && (
        <Modal
          color="warning"
          title="Are you sure?"
          message="Selected Contact will be Deleted. This process cannot be undone."
          option1={{
            color: "error",
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
        <ViewActionContainer>
          <Button
            variant="outlined"
            color="info"
            onClick={onEditButtonClickHandler}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={onDeleteButtonClickHandler}
          >
            Delete
          </Button>
        </ViewActionContainer>
        <Divider />
        <ContactViewContainer>
          <ContactViewHead>
            <Avatar
              name={`${contact.firstname} ${contact.middlename} ${contact.lastname}`}
            />
            <ContactViewName>{`${contact.firstname} ${contact.middlename} ${contact.lastname}`}</ContactViewName>
            <ContactViewTitle>{contact.title}</ContactViewTitle>
          </ContactViewHead>
          <DetailItemsWrapper>
            <DetailItemWrapper>
              <IconLabelWrapper>
                <FaEnvelope />
                Email
              </IconLabelWrapper>
              <DetailItemInfo>{contact.email}</DetailItemInfo>
            </DetailItemWrapper>
            <DetailItemWrapper>
              <IconLabelWrapper>
                <FaPhoneAlt />
                Phone
              </IconLabelWrapper>
              <DetailItemInfo>{contact.number}</DetailItemInfo>
            </DetailItemWrapper>
            <DetailItemWrapper>
              <IconLabelWrapper>
                <FaMapMarkedAlt />
                Delivery Address
              </IconLabelWrapper>
              <DetailItemInfo>{contact.address1}</DetailItemInfo>
            </DetailItemWrapper>
            <DetailItemWrapper>
              <IconLabelWrapper>
                <FaMap />
                Billing Address
              </IconLabelWrapper>
              <DetailItemInfo>{contact.address2}</DetailItemInfo>
            </DetailItemWrapper>
            <DetailItemWrapper>
              <IconLabelWrapper>
                <FaStickyNote />
                Notes
              </IconLabelWrapper>
              <DetailItemNote>{contact.notes}</DetailItemNote>
            </DetailItemWrapper>
          </DetailItemsWrapper>
        </ContactViewContainer>
      </ContactDetailsContentWrapper>
    </>
  );
};

export default ContactDetailsView;
