import React from "react";

import classNames from "classnames";
import styles from "./FormInput.module.css";
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
        onInput={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
      <div className={globalStyles["invalid-feedback"]}>
        {props.invalidFeedback}
      </div>
    </div>
  );
};

export const FormInputLine = (props) => {
  return (
    <div className={(classNames(globalStyles.row), styles.container)}>
      <div className={classNames(globalStyles["col-4"])}>
        <label htmlFor={props.id} className={styles.label}>
          {props.label}
        </label>
      </div>
      <div className={classNames(globalStyles["col-8"])}>
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
          placeholder={props.placeholder || ""}
          defaultValue={props.defaultValue}
          onInput={props.onChange}
        />
        <div className={globalStyles["invalid-feedback"]}>
          {props.invalidFeedback}
        </div>
      </div>
    </div>
  );
};

export const TextArea = (props) => {
  return (
    <div className={(classNames(globalStyles.row), styles.container)}>
      <div className={classNames(globalStyles["col-4"])}>
        <label htmlFor={props.id} className={styles.label}>
          {props.label}
        </label>
      </div>
      <div className={classNames(globalStyles["col-8"])}>
        <textarea
          rows={props.rows || 1}
          className={classNames(
            globalStyles["form-control"],
            props.defaultValue.length !== 0 &&
              (props.isInvalid
                ? globalStyles["is-invalid"]
                : globalStyles["is-valid"])
          )}
          id={props.id}
          placeholder={props.placeholder || ""}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
        <div className={globalStyles["invalid-feedback"]}>
          {props.invalidFeedback}
        </div>
      </div>
    </div>
  );
};

export default FormInput;
