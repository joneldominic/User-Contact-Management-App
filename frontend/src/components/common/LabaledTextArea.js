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

const TextAreaWrapper = styled.div``;
const TextArea = styled.textarea`
  width: 100%;
  border: hidden;
  border-radius: 5px;
  padding: 7px;
  font-size: ${(props) => props.theme.size.base};
  font-family: "Roboto", sans-serif;
  background-color: ${(props) => props.theme.background.default};
  color: ${(props) => props.theme.text.primary};
  wrap: "soft";
  resize: none;

  &:focus {
    outline: none;
  }
`;

const LabaledTextArea = (props) => {
  return (
    <FormControl>
      <LabelWrapper>
        <Label htmlFor={props.name}>
          {props.label}
          {props.isRequired && <span> *</span>}
        </Label>
      </LabelWrapper>
      <TextAreaWrapper>
        <TextArea
          id={props.name}
          name={props.name}
          rows={props.rows}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </TextAreaWrapper>
    </FormControl>
  );
};

LabaledTextArea.defaultProps = {
  isRequired: false,
  name: "name",
  rows: 5,
  label: "Label",
  placeholder: "",
  value: "",
  onChange: () => {},
};

export default LabaledTextArea;
