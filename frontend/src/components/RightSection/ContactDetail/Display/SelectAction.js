import React from "react";

import { useHistory, useParams } from "react-router-dom";

import styles from "./SelectAction.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const SelectAction = (props) => {
  const params = useParams();
  const history = useHistory();

  return (
    <div className={classNames(globalStyles.row, styles.actionsContainer)}>
      <div className={globalStyles["col-6"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-primary"],
            globalStyles["w-100"]
          )}
          onClick={() => history.replace("/contacts/new")}
        >
          Add New Contact
        </button>
      </div>
      <div className={globalStyles["col-3"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-success"],
            globalStyles["w-100"]
          )}
          onClick={() => history.push(`/contacts/${params.contactId}/edit`)}
        >
          Edit
        </button>
      </div>
      <div className={globalStyles["col-3"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-danger"],
            globalStyles["w-100"]
          )}
          onClick={props.onDeleteButtonClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SelectAction;
