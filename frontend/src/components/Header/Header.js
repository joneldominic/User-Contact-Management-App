import React from "react";

import { FaUsers, FaSignOutAlt } from "react-icons/fa";

import Container from "../../core/UI/Container";
import Avatar from "../../core/UI/Avatar";

import {
  AppBar,
  MainWrapper,
  LogoWrapper,
  ProfileWrapper,
  UserName,
  SignOutButton,
} from "./style";

const Header = () => {
  return (
    <AppBar>
      <Container>
        <MainWrapper>
          <LogoWrapper>
            <FaUsers />
            My Contacts
          </LogoWrapper>
          <ProfileWrapper>
            <Avatar name="Jonel Dominic Tapang" />
            <UserName>Jonel Dominic Tapang</UserName>
            <SignOutButton>
              <FaSignOutAlt />
            </SignOutButton>
          </ProfileWrapper>
        </MainWrapper>
      </Container>
    </AppBar>
  );
};

export default Header;
