import styled from "styled-components";

const Card = styled.div`
  border-radius: 4px;
  display: block;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  min-width: ${(props) => props.minWidth};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: ${(props) => props.overflow};
  margin: ${(props) => props.margin};
  background: ${(props) => props.background || props.theme.background.paper};
`;

Card.defaultProps = {
  height: "auto",
  width: "auto",
  overflow: "hidden",
  minWidth: "275px",
  margin: "0.5em",
  background: undefined,
};

export default Card;
