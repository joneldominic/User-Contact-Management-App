import styled from "styled-components";

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

const UnderlinedInput = (props) => {
  return (
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
  );
};

UnderlinedInput.defaultProps = {
  isInvalid: false,
};

export default UnderlinedInput;
