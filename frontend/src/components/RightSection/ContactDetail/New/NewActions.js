import React from "react";

import { useHistory } from "react-router-dom";

import Button from "../../../common/Button/Button";

import styles from "./NewActions.module.css";

const NewActions = (props) => {
  const history = useHistory();

  return (
    <div className={styles.actionsContainer}>
      <div className={styles.rightActionItem}>
        <React.Fragment>
          <Button
            className={styles.button}
            buttonStyle="success"
            onClick={props.onSaveButtonClick}
          >
            Save
          </Button>
          <Button
            className={styles.button}
            buttonStyle="primary"
            onClick={() => history.replace(`/contacts`)}
          >
            Cancel
          </Button>
        </React.Fragment>
      </div>
    </div>
  );
};

export default NewActions;
