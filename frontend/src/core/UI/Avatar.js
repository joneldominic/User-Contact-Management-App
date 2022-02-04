import styled from "styled-components";

const Avatar = styled.div`
  font-size: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
`;

Avatar.defaultProps = {
  width: "42px",
  height: "42px",
  backgroundColor: "#492231",
};

export default Avatar;
