import React from "react";

import ContactDetailsView from "./ContactDetailsView";
import ContactDetailsEdit from "./ContactDetailsEdit";
import ContactDetailsNew from "./ContactDetailsNew";
import NoContactSelected from "./NoContactSelected";

import { ContactDetailsContainer, ContactDetailsCard } from "./styles";

const ContactDetails = () => {
  return (
    <ContactDetailsContainer>
      <ContactDetailsCard>
        {/* <ContactDetailsView /> */}
        {/* <ContactDetailsEdit /> */}
        <ContactDetailsNew />
        {/* <NoContactSelected /> */}
      </ContactDetailsCard>
    </ContactDetailsContainer>
  );
};

export default ContactDetails;
