import React from "react";

import Button from "../../core/UI/Button";
import LabaledInput from "../common/LabaledInput";
import LabaledTextArea from "../common/LabaledTextArea";

import {
  Divider,
  ActionContainer,
  ContactDetailsContentWrapper,
  ContactEditNewContainer,
  ContactEditNewHead,
  EditNewForm,
} from "./styles";

const ContactDetailsEdit = () => {
  return (
    <ContactDetailsContentWrapper>
      <ActionContainer>
        <Button variant="outlined" color="success">
          Save
        </Button>
        <Button variant="outlined" color="warning">
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
          />
          <LabaledInput
            name="middlename"
            type="text"
            label="Middle Name"
            isRequired={false}
          />
          <LabaledInput
            name="lastname"
            type="text"
            label="Last Name"
            isRequired={true}
          />
          <LabaledInput
            name="title"
            type="text"
            label="Title"
            isRequired={true}
          />
          <LabaledInput
            name="email"
            type="email"
            label="Email"
            placeholder="sample@email.com"
            isRequired={true}
          />
          <LabaledInput
            name="phone"
            type="number"
            label="Phone Number"
            placeholder="09XXXXXXXXX"
            isRequired={true}
          />
          <LabaledInput
            name="deliveryaddress"
            type="text"
            label="Delivery Address"
            isRequired={true}
          />
          <LabaledInput
            name="billingaddress"
            type="text"
            label="Billing Address"
            placeholder="Leave Blank if the same with Delivery Address"
            isRequired={false}
          />
          <LabaledTextArea
            name="billingaddress"
            type="text"
            label="Billing Address"
            isRequired={false}
          />
        </EditNewForm>
      </ContactEditNewContainer>
    </ContactDetailsContentWrapper>
  );
};

export default ContactDetailsEdit;
