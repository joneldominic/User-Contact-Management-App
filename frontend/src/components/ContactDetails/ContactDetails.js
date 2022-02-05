import React from "react";

import ContactDetailsView from "./ContactDetailsView";
import ContactDetailsEdit from "./ContactDetailsEdit";
import ContactDetailsNew from "./ContactDetailsNew";
import NoContactSelected from "./NoContactSelected";

import { ContactDetailsContainer, ContactDetailCard } from "./styles";

const ContactDetails = () => {
  return (
    <ContactDetailsContainer>
      <ContactDetailCard>
        <ContactDetailsView />
        {/* <ContactDetailsEdit /> */}
        {/* <ContactDetailsNew /> */}
        {/* <NoContactSelected /> */}
      </ContactDetailCard>
    </ContactDetailsContainer>
  );
};

export default ContactDetails;
