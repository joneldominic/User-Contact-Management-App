import React from "react";

import PrimaryButtonStyles from "./PrimaryButton.module.css";
import SuccessButtonStyles from "./SuccessButton.module.css";
import DangerButtonStyles from "./DangerButton.module.css";

const Button = (props) => {
  let buttonStyle = PrimaryButtonStyles;

  switch ((props.buttonStyle ?? "").toLowerCase()) {
    case "primary":
      buttonStyle = PrimaryButtonStyles;
      break;
    case "success":
      buttonStyle = SuccessButtonStyles;
      break;
    case "danger":
      buttonStyle = DangerButtonStyles;
      break;
    default:
      buttonStyle = PrimaryButtonStyles;
  }

  return (
    <button
      type={props.type || "button"}
      className={`${buttonStyle.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
