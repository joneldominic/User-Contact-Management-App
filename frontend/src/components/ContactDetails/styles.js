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
