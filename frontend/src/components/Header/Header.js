import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaUsers, FaSignOutAlt } from "react-icons/fa";

import Container from "../../core/UI/Container";
import Avatar from "../../core/UI/Avatar";

import { logout } from "../../redux/auth-slice";

import {
  AppBar,
  MainWrapper,
  LogoWrapper,
  ProfileWrapper,
  UserName,
  SignOutButton,
} from "./styles";

const Header = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);

  const onLogoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AppBar>
      <Container>
        <MainWrapper>
          <LogoWrapper>
            <FaUsers />
            My Contacts
          </LogoWrapper>
          <ProfileWrapper>
            <Avatar name={name} />
            <UserName>{name}</UserName>
            <SignOutButton onClick={onLogoutHandler}>
              <FaSignOutAlt />
            </SignOutButton>
          </ProfileWrapper>
        </MainWrapper>
      </Container>
    </AppBar>
  );
};

export default Header;
