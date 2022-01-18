import React from "react";

import { useHistory, useParams } from "react-router-dom";

import Button from "../../../common/Button/Button";

import styles from "./EditActions.module.css";

const EditActions = (props) => {
  const params = useParams();
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
            Save Update
          </Button>
          <Button
            className={styles.button}
            buttonStyle="primary"
            onClick={() => history.replace(`/contacts/${params.contactId}`)}
          >
            Cancel
          </Button>
        </React.Fragment>
      </div>
    </div>
  );
};

export default EditActions;
