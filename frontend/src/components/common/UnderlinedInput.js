import styled from "styled-components";

import { FaInfoCircle } from "react-icons/fa";

const MainWrapper = styled.div``;

const FormControl = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.divider};

  border-bottom-color: ${(props) => props.isInvalid && props.theme.error.main};
`;

const Input = styled.input`
  width: 100%;
  margin: 0px 0px 10px 10px;
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

const UnderlinedInput = (props) => {
  return (
    <MainWrapper>
      <FormControl isInvalid={props.isInvalid}>
        {props.icon}
        <Input
          id={props.id}
          name={props.name}
          type={props.type}
          autoComplete="off"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
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

UnderlinedInput.defaultProps = {
  isInvalid: false,
};

export default UnderlinedInput;
