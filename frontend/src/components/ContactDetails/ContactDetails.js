import React from "react";

import ContactDetailsView from "./ContactDetailsView";
import ContactDetailsEdit from "./ContactDetailsEdit";
import ContactDetailsNew from "./ContactDetailsNew";
import NoContactSelected from "./NoContactSelected";

import { ContactDetailsContainer, ContactListCard } from "./styles";

const ContactDetails = () => {
  return (
    <ContactDetailsContainer>
      <ContactListCard>
        {/* <ContactDetailsView /> */}
        {/* <ContactDetailsEdit /> */}
        {/* <ContactDetailsNew /> */}
        <NoContactSelected />
      </ContactListCard>
    </ContactDetailsContainer>
  );
};

export default ContactDetails;
