import styled from "styled-components";

const FormControl = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.divider};

  border-bottom-color: ${(props) => props.invalid && props.theme.error.main};
`;

const Input = styled.input`
  width: 100%;
  margin: 0px 0px 10px 10px;
  color: ${(props) => props.theme.text.primary};

  border: hidden;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const InputUnderlined = (props) => {
  return (
    <FormControl invalid={props.invalid}>
      {props.icon}
      <Input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
    </FormControl>
  );
};

InputUnderlined.defaultProps = {
  invalid: false,
};

export default InputUnderlined;
