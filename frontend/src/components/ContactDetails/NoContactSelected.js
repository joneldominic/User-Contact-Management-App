import styled from "styled-components";

import { FaInfoCircle } from "react-icons/fa";

const MainWrapper = styled.div`
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  font-size: ${(props) => props.theme.size.xxxxl};
`;

const Message = styled.div``;

const SubMessage = styled.div`
  margin: 5px 0px;
  font-size: ${(props) => props.theme.size.sm};
  color: ${(props) => props.theme.text.secondary};
`;

const NoContactSelected = () => {
  return (
    <MainWrapper>
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
      <Message>No Contact Selected</Message>
      <SubMessage>Try selecting one from the list.</SubMessage>
    </MainWrapper>
  );
};

export default NoContactSelected;
