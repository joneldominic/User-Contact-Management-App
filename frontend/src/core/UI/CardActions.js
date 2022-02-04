import styled from "styled-components";

const CardActions = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;

  ${(props) => props.sx}
`;
CardActions.defaultProps = { sx: {} };

export default CardActions;
