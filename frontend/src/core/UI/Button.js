import styled, { css } from "styled-components";

const Button = styled.button`
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 5px;
  letter-spacing: 0.025em;

  font-size: ${(props) => props.theme.size[props.size]};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};

  ${(props) => {
    switch (props.variant) {
      case "outlined":
        return css`
          color: ${props.theme[props.color].main};
          background-color: transparent;
          background-repeat: no-repeat;
          border: 1px solid ${props.theme[props.color].main};

          &:hover:not([disabled]) {
            background-color: ${props.theme[props.color].main}1A;
            border: 1px solid ${props.theme[props.color].light};
          }

          &[disabled] {
            cursor: not-allowed;
          }
        `;
      case "contained":
        return css`
          color: ${props.theme[props.color].contrastText};
          background-color: ${props.theme[props.color].main};
          border: none;

          &:hover:not([disabled]) {
            background-color: ${props.theme[props.color].dark};
          }

          &[disabled] {
            background-color: ${props.theme[props.color].dark};
            cursor: not-allowed;
          }
        `;
      default:
        return css`
          color: ${props.theme[props.color].main};
          background-color: transparent;
          background-repeat: no-repeat;
          border: none;

          &:hover:not([disabled]) {
            background-color: ${props.theme[props.color].main}1A;
          }
        `;
    }
  }}
`;

Button.defaultProps = {
  variant: undefined,
  color: "primary",
  size: "base",
  margin: "0.5em",
  padding: "0.5em 1em",
};

export default Button;
