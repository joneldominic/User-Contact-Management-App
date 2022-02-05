import styled from "styled-components";

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
