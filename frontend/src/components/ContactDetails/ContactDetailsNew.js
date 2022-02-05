import React from "react";

import Button from "../../core/UI/Button";

import { Divider, ActionContainer } from "./styles";

const ContactDetailsNew = () => {
  return (
    <>
      <ActionContainer>
        <Button variant="outlined" color="success">
          Save
        </Button>
        <Button variant="outlined" color="warning">
          Cancel
        </Button>
      </ActionContainer>
      <Divider />
    </>
  );
};

export default ContactDetailsNew;