import React from "react";

import classNames from "classnames";
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css";

const Toast = (props) => {
  let errorMessage = "";
  if (Array.isArray(props.message)) {
    errorMessage = props.message.map((_err) => {
      return (
        <>
          {_err}
          <br />
        </>
      );
    });
  } else {
    errorMessage = <>{props.message}</>;
  }

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
          {errorMessage}
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
