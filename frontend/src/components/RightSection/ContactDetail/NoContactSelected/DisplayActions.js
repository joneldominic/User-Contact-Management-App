import React from "react";

import { useHistory } from "react-router-dom";

import Button from "../../../common/Button/Button";

import styles from "./DisplayActions.module.css";

const DisplayActions = (props) => {
  const history = useHistory();

  return (
    <div className={styles.actionsContainer}>
      <Button
        disabled={props.disableLeftButton}
        className={styles.button}
        buttonStyle="primary"
        onClick={() => history.replace("/contacts/new")}
      >
        Add New Contact
      </Button>
    </div>
  );
};

export default DisplayActions;
