import React from "react";

import classNames from "classnames";
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css";

const Toast = (props) => {
  return (
    <div
      className={classNames(
        globalStyles["border"],
        globalStyles["rounded"],
        globalStyles["border-danger"],
        globalStyles["my-3"],
        globalStyles["w-100"]
      )}
    >
      <div className={globalStyles["d-flex"]}>
        <div
          className={classNames(globalStyles["toast-body"], props.className)}
        >
          {props.message}
        </div>
        <button
          type="button"
          className={classNames(
            globalStyles["btn-close"],
            globalStyles["me-2"],
            globalStyles["m-auto"]
          )}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};

export default Toast;
