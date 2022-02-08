import { useState } from "react";

import styled from "styled-components";

import { FaLock, FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

const MainWrapper = styled.div``;

const FormControl = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.divider};

  border-bottom-color: ${(props) => props.isInvalid && props.theme.error.main};

  & > .toggleButton:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 0px 10px 10px 10px;
  color: ${(props) => props.theme.text.primary};

  border: hidden;
  background-color: transparent;
  background: none;

  &:focus {
    outline: none;
  }
`;

const InvalidFeedback = styled.div`
  font-size: ${(props) => props.theme.size.xs};
  display: flex;
  align-items: center;
  margin-top: 5px;
  color: ${(props) => props.theme.error.main};

  & > svg {
    margin-right: 5px;
  }
`;

const UnderlinedPasswordInput = (props) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <MainWrapper>
      <FormControl isInvalid={props.isInvalid}>
        <FaLock />
        <Input
          id={props.id}
          name={props.name}
          type={show ? "text" : "password"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <div className="toggleButton" onClick={toggleShow}>
          {show ? <FaEyeSlash /> : <FaEye />}
        </div>
      </FormControl>
      {props.isInvalid && props.invalidFeedback && (
        <InvalidFeedback>
          <FaInfoCircle />
          {props.invalidFeedback}
        </InvalidFeedback>
      )}
    </MainWrapper>
  );
};

UnderlinedPasswordInput.defaultProps = {
  isInvalid: false,
};

export default UnderlinedPasswordInput;
