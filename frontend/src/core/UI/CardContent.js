import styled from "styled-components";

const Content = styled.div`
  display: block;
  padding: 16px;

  ${(props) => props.sx}
`;

const CardContent = (props) => {
  return <Content sx={props.sx}>{props.children}</Content>;
};

CardContent.defaultProps = { sx: {} };

export default CardContent;
