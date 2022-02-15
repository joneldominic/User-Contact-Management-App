import React from "react";
import styled from "styled-components";

const FormControl = styled.div`
  display: flex;
  flex-flow: column;
`;

const LabelWrapper = styled.div`
  padding: 0px 0px 5px 0px;
  & > label > span:first-child {
    margin-left: 5px;
    color: ${(props) => props.theme.error.main};
  }

  & > label > span:last-child {
    margin-left: 5px;
    color: ${(props) => props.theme.error.main};
  }
`;

const Label = styled.label`
  font-weight: 400;
  font-size: ${(props) => props.theme.size.sm};
`;

const InputWrapper = styled.div``;
const Input = styled.input`
  width: 100%;
  border: hidden;
  border-radius: 5px;
  padding: 7px;
  font-size: ${(props) => props.theme.size.base};
  background-color: ${(props) => props.theme.background.default};
  color: ${(props) => props.theme.text.primary};
  letter-spacing: 0.2px;

  &:focus {
    outline: none;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const LabaledInput = (props) => {
  return (
    <FormControl>
      <LabelWrapper>
        <Label htmlFor={props.name}>
          {props.label}
          {props.isRequired && <span> *</span>}
          {props.isInvalid && props.invalidFeedback && (
            <span>{props.invalidFeedback}</span>
          )}
        </Label>
      </LabelWrapper>
      <InputWrapper>
        <Input
          id={props.name}
          name={props.name}
          type={props.type}
          autoComplete="off"
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </InputWrapper>
    </FormControl>
  );
};

LabaledInput.defaultProps = {
  isRequired: false,
  name: "name",
  type: "text",
  label: "Label",
  placeholder: "",
  value: "",
  onChange: () => {},
};

export default LabaledInput;
