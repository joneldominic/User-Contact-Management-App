import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import Avatar from "../../core/UI/Avatar";

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text.primary};
`;

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
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const { contact } = props;
  const name = `${contact.firstname} ${contact.middlename} ${contact.lastname}`;

  return (
    <LinkWrapper to={`/contacts/${contact.id}`}>
      <MainWrapper isSelected={+splitLocation[2] === props.contact.id}>
        <ContactAvatar name={name} />
        <DetailWrapper>
          <Name>{name}</Name>
          <Title>{contact.title}</Title>
        </DetailWrapper>
      </MainWrapper>
    </LinkWrapper>
  );
};

export default ContactListItem;
