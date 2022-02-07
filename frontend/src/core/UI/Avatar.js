import styled from "styled-components";

import { stringToColor } from "../../utils/helper-functions";

const AvatarWrapper = styled.div`
  font-size: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.color};
`;

const Avatar = (props) => {
  const stringToInitials = (name) => {
    const nameSplit = name.trim().split(" ");
    const initials = `${nameSplit[0][0]}${
      nameSplit.length > 1 ? nameSplit[nameSplit.length - 1][0] : ""
    }`;

    return initials;
  };

  return (
    <AvatarWrapper
      color={stringToColor(props.name)}
      width={props.width}
      height={props.height}
    >
      {stringToInitials(props.name)}
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  width: "42px",
  height: "42px",
  name: "",
};

export default Avatar;
