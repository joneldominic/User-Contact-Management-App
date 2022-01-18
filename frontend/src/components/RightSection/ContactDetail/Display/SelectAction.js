import React, { useContext } from "react";

import { useHistory, useParams } from "react-router-dom";
import ContactContext from "../../../../context/contact-context";

import Button from "../../../common/Button/Button";

import styles from "./SelectAction.module.css";

const SelectAction = (props) => {
  const contactCtx = useContext(ContactContext);
  const params = useParams();
  const history = useHistory();

  const onDeleteHandler = () => {
    contactCtx.deleteContact(params.contactId);
    history.replace("/contacts");
  };

  return (
    <div className={styles.actionsContainer}>
      <div className={styles.leftActionItem}>
        <Button
          disabled={props.disableLeftButton}
          className={styles.button}
          buttonStyle="primary"
          onClick={() => history.replace("/contacts/new")}
        >
          Add New Contact
        </Button>
      </div>
      <div className={styles.rightActionItem}>
        <React.Fragment>
          <Button
            className={styles.button}
            disabled={props.disableRightButtons}
            buttonStyle="success"
            onClick={() => history.push(`/contacts/${params.contactId}/edit`)}
          >
            Edit
          </Button>
          <Button
            className={styles.button}
            disabled={props.disableRightButtons}
            buttonStyle="danger"
            onClick={onDeleteHandler}
          >
            Delete
          </Button>
        </React.Fragment>
      </div>
    </div>
  );
};

export default SelectAction;
