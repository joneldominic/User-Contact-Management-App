import styled from "styled-components";

export const AppBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px;
  background-color: ${(props) => props.theme.primary.main};
`;

export const MainWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const LogoWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.size.xl};

  & svg {
    margin-right: 5px;
    font-size: ${(props) => props.theme.size.xxl};
  }
`;

export const ProfileWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const UserName = styled.div`
  margin: 0px 10px;
  font-size: ${(props) => props.theme.size.lg};
`;

export const SignOutButton = styled.div`
  display: inline-flex;
  justify-content: center;
  font-size: ${(props) => props.theme.size.xl};
  &:hover {
    cursor: pointer;
  }
`;
