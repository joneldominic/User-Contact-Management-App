import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import globalStyles from "../../../assets/global-styles/bootstrap.min.module.css";
import classNames from "classnames";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classNames(styles.modal, globalStyles.card)}>
      <div className={classNames(globalStyles["card-header"])}>
        <h4>{props.title}</h4>
      </div>
      <div className={globalStyles["card-body"]}>
        <h5 className={globalStyles["card-title"]}>{props.message}</h5>
      </div>
      <div
        className={classNames(
          globalStyles["card-footer"],
          globalStyles["modal-footer"]
        )}
      >
        <button
          className={classNames(
            globalStyles.btn,
            props.buttonAStyle || globalStyles["btn-secondary"]
          )}
          onClick={props.onButtonAClick}
        >
          {props.buttonALabel || "Button A"}
        </button>
        <button
          className={classNames(
            globalStyles.btn,
            props.buttonBStyle || globalStyles["btn-primary"]
          )}
          onClick={props.onButtonBClick}
        >
          {props.buttonBLabel || "Button B"}
        </button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          buttonALabel={props.buttonALabel}
          buttonAStyle={props.buttonAStyle}
          onButtonAClick={props.onButtonAClick}
          buttonBLabel={props.buttonBLabel}
          buttonBStyle={props.buttonBStyle}
          onButtonBClick={props.onButtonBClick}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
