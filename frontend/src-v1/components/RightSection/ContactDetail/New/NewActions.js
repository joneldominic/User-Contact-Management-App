import React from "react";

import styles from "./NewActions.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const NewActions = (props) => {
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
          {!props.isLoading ? <span>Save</span> : <span>Loading...</span>}
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
          onClick={props.onCancelButtonClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewActions;
