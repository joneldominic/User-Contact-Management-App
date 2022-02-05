import React from "react";
import styled from "styled-components";

const FormControl = styled.div`
  display: flex;
  flex-flow: column;
`;

const LabelWrapper = styled.div`
  padding: 0px 0px 5px 0px;
  & > label > span {
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
`;

const LabaledInput = (props) => {
  return (
    <FormControl>
      <LabelWrapper>
        <Label htmlFor={props.name}>
          {props.label}
          {props.isRequired && <span> *</span>}
        </Label>
      </LabelWrapper>
      <InputWrapper>
        <Input
          id={props.name}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
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
};

export default LabaledInput;
