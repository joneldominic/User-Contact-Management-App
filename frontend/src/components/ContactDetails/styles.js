import styled from "styled-components";

import Container from "../../core/UI/Container";
import Card from "../../core/UI/Card";

export const ContactDetailsContainer = styled(Container)`
  flex: 50%;

  @media (max-width: 991px) {
    flex: 100%;
  }
`;

export const ContactDetailCard = styled(Card)`
  margin: 50px 0px 0px 10px;
  height: 75vh;

  @media (max-width: 991px) {
    margin: 30px 0px 0px 0px;
  }
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  margin: 0px;
  background-color: ${(props) => props.theme.divider};
`;

export const ActionContainer = styled.div`
  min-height: 91px;
  flex: 1 1 auto;
  padding: 0px 15px;

  display: flex;
  align-items: center;

  & > button {
    width: 100%;
  }
`;

// Contact Details View ------------------------------------

export const ContactViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 50px 0px 50px;
`;

export const ContactViewHead = styled.div`
  margin: 10px 0px 25px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContactViewName = styled.div`
  font-size: ${(props) => props.theme.size.lg};
  color: ${(props) => props.theme.text.primary};
  margin: 10px 0px 5px 0px;
`;

export const ContactViewTitle = styled.div`
  font-size: ${(props) => props.theme.size.base};
  color: ${(props) => props.theme.text.secondary};
`;

export const DetailItemsWrapper = styled.div`
  margin: 15px 0px 15px 0px;
  height: 35vh;
  padding: 0px 20px 15px 20px;

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

export const DetailItem = styled.div`
  display: flex;
  padding: 10px 0px;
`;

export const IconLabelWrapper = styled.div`
  flex: 1 1 0;

  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > svg {
    margin-right: 10px;
  }
`;

export const DetailItemInfo = styled.div`
  flex: 2 1 0;

  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DetailItemNote = styled.div`
  flex: 2 1 0;
  flex-wrap: wrap;
  padding-top: 3px;
  padding-right: 10px;
`;

// Contact Details View ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
