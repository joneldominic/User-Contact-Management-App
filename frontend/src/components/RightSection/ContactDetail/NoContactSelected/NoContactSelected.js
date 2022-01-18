import React from "react";
import Card from "../../../common/Card/Card";
import DisplayActions from "./DisplayActions";

import styles from "./NoContactSelected.module.css";

const NoContactSelected = (props) => {
  let message = "No Contact Selected";

  if (typeof props.message != "undefined") {
    message = props.message;
  }

  return (
    <React.Fragment>
      <DisplayActions />
      <hr className={styles.divider} />
      <Card className={styles.mainContainer}>
        <h3>{message}</h3>
      </Card>
    </React.Fragment>
  );
};

export default NoContactSelected;
