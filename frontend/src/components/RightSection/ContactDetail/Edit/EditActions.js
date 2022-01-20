import React from "react";

import { useHistory, useParams } from "react-router-dom";

import styles from "./EditActions.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const EditActions = (props) => {
  const params = useParams();
  const history = useHistory();

  return (
    <div className={classNames(globalStyles.row, styles.actionsContainer)}>
      <div className={globalStyles["col-6"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-success"],
            globalStyles["w-100"]
          )}
          disabled={!props.formIsValid || props.isLoading}
          onClick={props.onSaveButtonClick}
        >
          {!props.isLoading ? (
            <span>Save Update</span>
          ) : (
            <span>Loading...</span>
          )}
        </button>
      </div>
      <div className={globalStyles["col-6"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-danger"],
            globalStyles["w-100"]
          )}
          disabled={props.isLoading}
          onClick={() => history.replace(`/contacts/${params.contactId}`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditActions;
