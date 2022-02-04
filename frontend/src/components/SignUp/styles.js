import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: inline-flex;
  justify-content: center;
  margin-top: 30px;

  font-size: ${(props) => props.theme.size.xl};

  & svg {
    margin-left: 5px;
    font-size: ${(props) => props.theme.size.xxl};
  }
`;

export const Form = styled.form`
  padding: 10px 50px;

  & > div:not(:last-child) {
    margin-bottom: 25px;
  }
`;

export const FormControl = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.divider};
`;

export const Input = styled.input`
  width: 100%;
  margin: 0px 0px 10px 10px;
  color: ${(props) => props.theme.text.primary};

  border: hidden;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const FormAction = styled.div`
  margin-top: 50px;

  & > button {
    margin: 0px;
    width: 100%;
  }
`;

export const Footer = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.size.sm};
  color: ${(props) => props.theme.text.secondary};
  font-weight: 400;

  & > p > a {
    font-size: ${(props) => props.theme.size.base};
    color: ${(props) => props.theme.primary.main};
    text-decoration: none;
  }
`;
