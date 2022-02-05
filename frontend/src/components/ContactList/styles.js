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
  height: 75vh;

  @media (max-width: 991px) {
    margin: 50px 0px 0px 0px;
  }
`;

export const ContactListCardContent = styled.div`
  padding: 16px 0px;
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  background-color: ${(props) => props.theme.divider};
`;
