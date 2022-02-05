import React from "react";

import Button from "../../core/UI/Button";

import { Divider, ActionContainer } from "./styles";

const ContactDetailsView = () => {
  return (
    <>
      <ActionContainer>
        <Button variant="outlined" color="info">
          Edit
        </Button>
        <Button variant="outlined" color="warning">
          Delete
        </Button>
      </ActionContainer>
      <Divider />
    </>
  );
};

export default ContactDetailsView;
