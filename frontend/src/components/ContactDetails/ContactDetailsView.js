import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaMap,
  FaStickyNote,
} from "react-icons/fa";

import Button from "../../core/UI/Button";
import Avatar from "../../core/UI/Avatar";

import NoContactSelected from "./NoContactSelected";

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

import { contactActions } from "../../redux/contact-slice";

const ContactDetailsView = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const contact = useSelector((state) => state.contact.selectedContact);

  console.log(contact);

  useEffect(() => {
    dispatch(contactActions.selectContact(params.contactId));
  }, [dispatch, params]);

  if (!contact) {
    return <NoContactSelected />;
  }

  return (
    <ContactDetailsContentWrapper>
      <ViewActionContainer>
        <Button variant="outlined" color="info">
          Edit
        </Button>
        <Button variant="outlined" color="warning">
          Delete
        </Button>
      </ViewActionContainer>
      <Divider />
      <ContactViewContainer>
        <ContactViewHead>
          <Avatar name="Jonel Tapang" />
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
  );
};

export default ContactDetailsView;
