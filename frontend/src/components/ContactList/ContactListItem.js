import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

import Avatar from "../../core/UI/Avatar";

import { contactActions } from "../../redux/contact-slice";
import { uiActions } from "../../redux/ui-slice";

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
    cursor: pointer;
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
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const hasPending = useSelector((state) => state.contact.hasPending);

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const { contact } = props;
  const name = `${contact.firstname} ${contact.middlename} ${contact.lastname}`;

  const onClickHandler = () => {
    if (hasPending.status) {
      console.log(hasPending)
      dispatch(contactActions.selectContact(props.contact.id));
      dispatch(uiActions.setModal({ show: true, id: hasPending.from }));
    } else {
      history.push(`/contacts/${contact.id}`);
    }
  };

  return (
    <MainWrapper
      isSelected={+splitLocation[2] === props.contact.id}
      onClick={onClickHandler}
    >
      <ContactAvatar name={name} />
      <DetailWrapper>
        <Name>{name}</Name>
        <Title>{contact.title}</Title>
      </DetailWrapper>
    </MainWrapper>
  );
};

export default ContactListItem;
