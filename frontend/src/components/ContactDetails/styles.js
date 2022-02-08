import styled from "styled-components";

import Container from "../../core/UI/Container";
import Card from "../../core/UI/Card";

export const ContactDetailsContainer = styled(Container)`
  flex: 50%;

  @media (max-width: 991px) {
    flex: 100%;
  }
`;

export const ContactDetailsCard = styled(Card)`
  margin: 50px 0px 0px 10px;
  height: 80vh;

  @media (max-width: 991px) {
    margin: 30px 0px 0px 0px;
  }
`;

export const Divider = styled.hr`
  min-height: 1px;
  border: none;
  margin: 0px;
  background-color: ${(props) => props.theme.divider};
`;

export const ActionContainer = styled.div`
  min-height: 91px;
  padding: 0px 15px;

  flex: 1 1 auto;

  display: flex;
  align-items: center;

  & > button {
    width: 100%;
  }
`;

export const ContactDetailsContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;

  padding-bottom: 40px;
`;

// Contact Details View ------------------------------------
export const ViewActionContainer = styled.div`
  height: 91px;
  padding: 0px 15px;

  display: flex;
  align-items: center;

  & > button {
    width: 100%;
  }
`;

export const ContactViewContainer = styled.div`
  padding: 15px 50px;
  flex: 2;

  height: 100%;
  display: flex;
  flex-flow: column;
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
  padding: 0px 20px 30px 20px;
  flex: 2;

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

export const DetailItemWrapper = styled.div`
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
  padding-top: 7px;
  padding-left: 5px;
  padding-right: 10px;
`;

// Contact Details View ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Contact Details Edit/New ------------------------------------

export const ContactEditNewContainer = styled.div`
  padding: 0px 0px 15px 50px;
  flex: 2 1 auto;

  height: 100%;
  display: flex;
  flex-flow: column;
`;

export const ContactEditNewHead = styled.div`
  display: flex;
  justify-content: center;

  font-size: ${(props) => props.theme.size.xl};
  padding: 25px 0px;

  background-color: ${(props) => props.theme.background.paper};
  position: sticky;
  top: 0px;
`;

export const EditNewForm = styled.form`
  margin: 0px 0px 15px 0px;
  padding: 0px 70px 50px 20px;
  flex: 2;

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

  & > div {
    padding-left: 2px;
    padding-right: 2px;
    margin-bottom: 15px;
  }
`;

// Contact Details Edit ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
