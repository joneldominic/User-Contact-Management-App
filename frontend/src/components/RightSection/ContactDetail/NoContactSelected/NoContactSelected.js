import React from "react";
import { useHistory } from "react-router-dom";

import Card from "../../../common/Card/Card";

import styles from "./NoContactSelected.module.css";
import globalStyles from "../../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const NoContactSelected = (props) => {
  const history = useHistory();

  let message = "No Contact Selected";

  if (typeof props.message != "undefined") {
    message = props.message;
  }

  return (
    <React.Fragment>
      <div className={styles.actionsContainer}>
        <button
          className={classNames(
            styles.button,
            globalStyles["btn"],
            globalStyles["btn-primary"],
            globalStyles["w-100"]
          )}
          onClick={() => history.replace("/contacts/new")}
        >
          Add New Contact
        </button>
      </div>
      <Card className={styles.mainContainer}>
        <h3>{message}</h3>
      </Card>
    </React.Fragment>
  );
};

export default NoContactSelected;
