import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import { FaExclamationTriangle } from "react-icons/fa";

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
  z-index: 10;
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
    /* margin-right: 20px; */
  }

  /* & > .actions button:last-child {
    margin-right: auto;
    margin-left: 20px;
  } */
`;

const IconWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  font-size: 50px;
  color: ${(props) => props.theme[props.color].main};
`;

const TitleWrapper = styled.div`
  margin-top: 10px;
  padding: 0px 20px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  text-align: justify;
  font-size: ${(props) => props.theme.size.xl};
`;

const MessageWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 5px;
  padding: 0px 20px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  text-align: justify;
`;

const Divider = styled.hr`
  border-top: 1px solid ${(props) => props.theme.divider};
`;

const ModalOverlay = (props) => {
  return (
    <ModalWrapper>
      <CardContent>
        <IconWrapper color="warning">
          <FaExclamationTriangle />
        </IconWrapper>
        <TitleWrapper>Are you sure?</TitleWrapper>
        <MessageWrapper>
          Do you really want to delete this contact? This process cannot be
          undone.
        </MessageWrapper>
      </CardContent>
      <Divider />
      <CardActions className="actions">
        <Button variant="outlined" color="warning">
          Option 1
        </Button>
        <Button variant="outlined" color="success">
          Option 2
        </Button>
      </CardActions>
    </ModalWrapper>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

Modal.defaultProps = {};

export default Modal;
