import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import {
  FaExclamationTriangle,
  FaExclamationCircle,
  FaRegCheckCircle,
} from "react-icons/fa";

import Button from "./Button";
import Card from "./Card";
import CardActions from "./CardActions";
import CardContent from "./CardContent";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background: rgba(0, 0, 0, 0.45);
`;

const ModalWrapper = styled(Card)`
  position: fixed;
  top: 30vh;
  z-index: 100;
  overflow: hidden;
  padding: 10px;

  @media (max-width: 767px) {
    left: calc(50% - 10rem);
    width: 20rem;
  }

  @media (min-width: 768px) {
    left: calc(50% - 15rem);
    width: 30rem;
  }

  & > .actions {
    width: 100%;
  }

  & > .actions button:first-child {
    margin-left: auto;
  }
  & > .actions button {
    width: 100px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  color: ${(props) => props.theme[props.color].main};
`;

const TitleWrapper = styled.div`
  margin-top: 10px;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  text-align: justify;
  font-size: ${(props) => props.theme.size.xl};
`;

const MessageWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 5px;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  text-align: justify;
`;

export const Divider = styled.hr`
  height: 2px;
  border: none;
  background-color: ${(props) => props.theme.divider};
  margin-left: 15px;
  margin-right: 15px;
`;

const ModalOverlay = (props) => {
  return (
    <ModalWrapper>
      <CardContent>
        <IconWrapper color={props.color}>
          {props.color === "warning" && <FaExclamationTriangle />}
          {props.color === "success" && <FaRegCheckCircle />}
          {(props.color === "error" || props.color === "info") && (
            <FaExclamationCircle />
          )}
        </IconWrapper>
        <TitleWrapper>{props.title}</TitleWrapper>
        <MessageWrapper>{props.message}</MessageWrapper>
      </CardContent>
      <Divider />
      <CardActions className="actions">
        <Button
          variant="outlined"
          color={props.option1.color}
          onClick={props.option1.callback}
        >
          {props.option1.label}
        </Button>
        <Button
          variant="outlined"
          color={props.option2.color}
          onClick={props.option2.callback}
        >
          {props.option2.label}
        </Button>
      </CardActions>
    </ModalWrapper>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.option2.callback} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          color={props.color}
          title={props.title}
          message={props.message}
          option1={props.option1}
          option2={props.option2}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

Modal.defaultProps = {
  color: "success",
  title: "Are you sure?",
  message:
    "Do you really want to perform this action? This process cannot be undone.",
  option1: { color: "warning", label: "Option 1", callback: () => {} },
  option2: { color: "error", label: "Option 2", callback: () => {} },
};

export default Modal;
