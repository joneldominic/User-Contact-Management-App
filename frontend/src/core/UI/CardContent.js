import styled from "styled-components";

const Content = styled.div`
  display: block;
  padding: 16px;
`;

const CardContent = (props) => {
  return <Content>{props.children}</Content>;
};

export default CardContent;
