import React from "react";
import styled, { css } from "styled-components";

import Avatar from "../../core/UI/Avatar";

const MainWrapper = styled.li`
  display: flex;
  align-items: center;

  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.divider};
  ${(props) => {
    return (
      props.isSelected &&
      css`
        background-color: ${(props) => props.theme.divider};
      `
    );
  }};

  &:hover {
    background-color: ${(props) => props.theme.divider};
  }
`;

const ContactAvatar = styled(Avatar)`
  margin: 0px 10px;
`;

const DetailWrapper = styled.div`
  margin-left: 10px;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.size.base};
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 3px;
`;
const Title = styled.div`
  font-size: ${(props) => props.theme.size.sm};
  color: ${(props) => props.theme.text.secondary};
`;

const ContactListItem = (props) => {
  return (
    <MainWrapper isSelected={props.isSelected}>
      <ContactAvatar name="Jonel Dominic Tapang" />
      <DetailWrapper>
        <Name>Jonel Dominic Tapang</Name>
        <Title>Developer</Title>
      </DetailWrapper>
    </MainWrapper>
  );
};

ContactListItem.defaultProps = {
  isSelected: false,
};

export default ContactListItem;
