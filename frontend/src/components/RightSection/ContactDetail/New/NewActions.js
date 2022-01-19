import React from "react";

import { useHistory } from "react-router-dom";

import styles from "./NewActions.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const NewActions = (props) => {
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
          onClick={props.onSaveButtonClick}
        >
          Save
        </button>
      </div>
      <div className={globalStyles["col-6"]}>
        <button
          className={classNames(
            globalStyles["btn"],
            globalStyles["btn-danger"],
            globalStyles["w-100"]
          )}
          onClick={() => history.replace(`/contacts`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewActions;
