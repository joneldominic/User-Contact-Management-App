import React from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaMap,
  FaStickyNote,
} from "react-icons/fa";

import Button from "../../core/UI/Button";
import Avatar from "../../core/UI/Avatar";

import {
  Divider,
  ContactDetailsContentWrapper,
  ActionContainer,
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

const ContactDetailsView = () => {
  return (
    <ContactDetailsContentWrapper>
      <ActionContainer>
        <Button variant="outlined" color="info">
          Edit
        </Button>
        <Button variant="outlined" color="warning">
          Delete
        </Button>
      </ActionContainer>
      <Divider />
      <ContactViewContainer>
        <ContactViewHead>
          <Avatar name="Jonel Tapang" />
          <ContactViewName>Jonel Dominic Tapang</ContactViewName>
          <ContactViewTitle>Developer</ContactViewTitle>
        </ContactViewHead>
        <DetailItemsWrapper>
          <DetailItemWrapper>
            <IconLabelWrapper>
              <FaEnvelope />
              Email
            </IconLabelWrapper>
            <DetailItemInfo>joneldominictapang@gmail.com</DetailItemInfo>
          </DetailItemWrapper>
          <DetailItemWrapper>
            <IconLabelWrapper>
              <FaPhoneAlt />
              Phone
            </IconLabelWrapper>
            <DetailItemInfo>09087863725</DetailItemInfo>
          </DetailItemWrapper>
          <DetailItemWrapper>
            <IconLabelWrapper>
              <FaMapMarkedAlt />
              Delivery Address
            </IconLabelWrapper>
            <DetailItemInfo>Itum, Duero, Bohol</DetailItemInfo>
          </DetailItemWrapper>
          <DetailItemWrapper>
            <IconLabelWrapper>
              <FaMap />
              Billing Address
            </IconLabelWrapper>
            <DetailItemInfo>Itum, Duero, Bohol</DetailItemInfo>
          </DetailItemWrapper>
          <DetailItemWrapper>
            <IconLabelWrapper>
              <FaStickyNote />
              Notes
            </IconLabelWrapper>
            <DetailItemNote>
              hello my name is jonel dominic tapang. I live in Itum, Duero,
              Bohol. I graduated from Visayas State University
            </DetailItemNote>
          </DetailItemWrapper>
        </DetailItemsWrapper>
      </ContactViewContainer>
    </ContactDetailsContentWrapper>
  );
};

export default ContactDetailsView;
