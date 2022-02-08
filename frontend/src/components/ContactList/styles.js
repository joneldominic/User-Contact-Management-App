import styled, { keyframes } from "styled-components";

import Container from "../../core/UI/Container";
import Card from "../../core/UI/Card";

export const ContactListContainer = styled(Container)`
  flex: 50%;
  position: relative;

  @media (max-width: 991px) {
    flex: 100%;
  }
`;

export const ContactListCard = styled(Card)`
  margin: 50px 10px 0px 0px;
  height: 80vh;

  @media (max-width: 991px) {
    margin: 50px 0px 0px 0px;
  }
`;

export const ContactListCardContent = styled.div`
  padding: 16px 0px 0px 0px;

  height: 100%;
  display: flex;
  flex-flow: column;
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  margin: 0px;
  background-color: ${(props) => props.theme.divider};
`;

export const ContactListItemContainer = styled.ul`
  flex: 2;
  margin: 0px;
  padding: 0px;
  list-style-type: none;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.text.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray1};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.gray2};
  }
`;

// Loading Spinner ------------------------------------
const LdsSpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  margin-left: -40px;
  margin-top: -40px;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ldsSpinner = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const LdsSpinner = styled.div`
  &r {
    border: 1px solid black;

    color: ${(props) => props.theme.text.primary};
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }
  & div {
    transform-origin: 20px 20px;
    animation: ${ldsSpinner} 1.2s linear infinite;
  }
  & div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 17px;
    width: 4px;
    height: 8px;
    border-radius: 20%;
    background: #fff;
  }
  & div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  & div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  & div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  & div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  & div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  & div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  & div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  & div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  & div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  & div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  & div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  & div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

export const LoadingSpinner = () => {
  return (
    <LdsSpinnerWrapper>
      <LdsSpinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LdsSpinner>
    </LdsSpinnerWrapper>
  );
};
// Loading Spinner ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
