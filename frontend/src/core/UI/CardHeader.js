import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const Content = styled.div`
  display: block;
  flex: 1 1 auto;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin-right: ${(props) => (props.show ? "16px" : "0")};
`;

const Title = styled.span`
  margin: 0;
  display: block;
  font-size: ${(props) => props.theme.size.xl};

  ${(props) => props.sx}
`;

const Subtitle = styled.span`
  margin: 5px 0 0 0;
  display: block;
  font-size: ${(props) => props.theme.size.base};
  color: ${(props) => props.theme.text.secondary};

  ${(props) => props.sx}
`;

const CardHeader = (props) => {
  return (
    <Header>
      <AvatarWrapper show={props.avatar}>{props.avatar}</AvatarWrapper>
      <Content>
        <Title sx={props.sxTitle}>{props.title}</Title>
        <Subtitle sx={props.sxSubTitle}>{props.subtitle}</Subtitle>
      </Content>
    </Header>
  );
};

CardHeader.defaultProps = { sxTitle: {}, sxSubTitle: {} };

export default CardHeader;
