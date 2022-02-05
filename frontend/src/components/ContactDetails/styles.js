import styled from "styled-components";

import Container from "../../core/UI/Container";
import Card from "../../core/UI/Card";

export const ContactDetailsContainer = styled(Container)`
  flex: 50%;

  @media (max-width: 991px) {
    flex: 100%;
  }
`;

export const ContactListCard = styled(Card)`
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
  height: 91px;

  padding-right: 15px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    width: 150px;
  }
`;
