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
  ContactDetailsViewContent,
  ActionContainer,
  ContactViewContainer,
  ContactViewHead,
  ContactViewName,
  ContactViewTitle,
  DetailItemsWrapper,
  DetailItem,
  IconLabelWrapper,
  DetailItemInfo,
  DetailItemNote,
} from "./styles";

const ContactDetailsView = () => {
  return (
    <ContactDetailsViewContent>
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
          <DetailItem>
            <IconLabelWrapper>
              <FaEnvelope />
              Email
            </IconLabelWrapper>
            <DetailItemInfo>joneldominictapang@gmail.com</DetailItemInfo>
          </DetailItem>
          <DetailItem>
            <IconLabelWrapper>
              <FaPhoneAlt />
              Phone
            </IconLabelWrapper>
            <DetailItemInfo>09087863725</DetailItemInfo>
          </DetailItem>
          <DetailItem>
            <IconLabelWrapper>
              <FaMapMarkedAlt />
              Delivery Address
            </IconLabelWrapper>
            <DetailItemInfo>Itum, Duero, Bohol</DetailItemInfo>
          </DetailItem>
          <DetailItem>
            <IconLabelWrapper>
              <FaMap />
              Billing Address
            </IconLabelWrapper>
            <DetailItemInfo>Itum, Duero, Bohol</DetailItemInfo>
          </DetailItem>
          <DetailItem>
            <IconLabelWrapper>
              <FaStickyNote />
              Notes
            </IconLabelWrapper>
            <DetailItemNote>
              hello my name is jonel dominic tapang. I live in Itum, Duero,
              Bohol. I graduated from Visayas State University
            </DetailItemNote>
          </DetailItem>
        </DetailItemsWrapper>
      </ContactViewContainer>
    </ContactDetailsViewContent>
  );
};

export default ContactDetailsView;
