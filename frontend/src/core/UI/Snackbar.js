import React from "react";
import styled from "styled-components";

import {
  FaExclamationTriangle,
  FaExclamationCircle,
  FaRegCheckCircle,
  FaTimes,
} from "react-icons/fa";

const MainWrapper = styled.div`
  margin: 0;
  margin-top: 16px;
  bottom: 24px;
  left: 24px;
  right: auto;
  z-index: 1400;
  position: fixed;
  display: flex;
  width: ${(props) => props.width};
`;

const ContentWrapper = styled.div`
  opacity: 1;
  transform: none;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  background-color: ${(props) => props.theme[props.color].main};
  display: flex;
  padding: 6px 16px;
  width: 100%;
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  padding: 7px 0;
  display: flex;
  align-items: center;
  opacity: 0.9;
  font-size: ${(props) => props.theme.size.xl};
`;

const MessageWrapper = styled.div`
  padding: 8px 0;
  display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Snackbar = (props) => {
  return (
    <MainWrapper width={props.width}>
      <ContentWrapper color={props.color}>
        <IconWrapper>
          {props.color === "warning" && <FaExclamationTriangle />}
          {props.color === "success" && <FaRegCheckCircle />}
          {(props.color === "error" || props.color === "info") && (
            <FaExclamationCircle />
          )}
        </IconWrapper>
        <MessageWrapper>{props.message}</MessageWrapper>
        <ButtonWrapper>
          <FaTimes />
        </ButtonWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

Snackbar.defaultProps = {
  color: "error",
  message: "Something went wrong. Please try again! aa a asdfa sdfas dfas",
  width: "400px",
};

export default Snackbar;
