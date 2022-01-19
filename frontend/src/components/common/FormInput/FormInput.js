import React from "react";

import classNames from "classnames";
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css";

const FormInput = (props) => {
  return (
    <div
      className={classNames(
        globalStyles["form-floating"],
        globalStyles["mb-3"]
      )}
    >
      <input
        type={props.type}
        className={classNames(
          globalStyles["form-control"],
          props.defaultValue.length !== 0 &&
            (props.isInvalid
              ? globalStyles["is-invalid"]
              : globalStyles["is-valid"])
        )}
        id={props.id}
        placeholder={props.label}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
      <div className={globalStyles["invalid-feedback"]}>
        {props.invalidFeedback}
      </div>
    </div>
  );
};

export default FormInput;
