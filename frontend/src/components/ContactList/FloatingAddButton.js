import React from "react";

import styled from "styled-components";

import { FaPlus } from "react-icons/fa";

const FloatWrapper = styled.div`
  border-radius: 50%;
  height: 60px;
  width: 60px;

  bottom: 25px;
  right: 35px;
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primary.main};
  font-size: ${(props) => props.theme.size.xxl};
  box-shadow: 1px 1px 2px ${(props) => props.theme.background.default};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.primary.light};
  }
`;

const FloatingAddButton = () => {
  return (
    <FloatWrapper>
      <FaPlus />
    </FloatWrapper>
  );
};

export default FloatingAddButton;
