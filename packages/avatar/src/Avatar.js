import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import {
  bgGray,
  white,
  success,
  warn,
  alert,
  gray06
} from "@happeouikit/colors";
import defaultImg from "./assets/img/avatar.png";

const sizeMap = {
  xs: {
    avatar: "26px"
  },
  s: {
    avatar: "32px",
    presence: "7px",
    presenceBorder: "1px"
  },
  m: {
    avatar: "40px",
    presence: "10px",
    presenceBorder: "2px"
  },
  l: {
    avatar: "66px",
    presence: "15px",
    presenceBorder: "3px"
  },
  xl: {
    avatar: "90px",
    presence: "20px",
    presenceBorder: "3px"
  },
  xxl: {
    avatar: "102px",
    presence: "20px",
    presenceBorder: "3px"
  }
};

const scaleAndFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  } 
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size = "xs" }) => sizeMap[size].avatar};
  height: ${({ size = "xs" }) => sizeMap[size].avatar};

  &.click-event {
    cursor: pointer;
  }
`;

const AvatarImg = styled.div`
  border-radius: 50%;
  overflow: hidden;
  background-color: ${bgGray};
  display: flex;
  align-items: center;
  justify-content: center;

  .hover-event:hover & {
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(0, -1px, 0);
  }

  .click-event:active & {
    transform: scale(0.95);
  }
`;

const Presence = styled.div`
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: 0;
  height: ${({ size }) => sizeMap[size].presence};
  width: ${({ size }) => sizeMap[size].presence};
  border: ${({ size }) => sizeMap[size].presenceBorder} solid ${white};
  animation: ${scaleAndFadeIn} 700ms;

  &.presence-free {
    background-color: ${success};
  }
  &.presence-busy {
    background-color: ${alert};
  }
  &.presence-outOfOffice {
    background-color: ${warn};
  }
  &.presence-unknown {
    background-color: ${gray06};
  }
`;

const Avatar = ({ hoverEvent, clickEvent, user, showPresence, size }) => {
  const canShowPresence = () => showPresence && size !== "xs";
  const src = user.thumbnailPhotoUrl || defaultImg;
  return (
    <Container
      size={size}
      className={`${hoverEvent ? "hover-event" : ""} ${
        clickEvent ? "click-event" : ""
      }`}
    >
      <AvatarImg>
        <img
          width="100%"
          height="100%"
          src={src}
          alt={user.fullName || user.name.fullName}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultImg;
          }}
        />
      </AvatarImg>
      {canShowPresence() && (
        <Presence
          size={size}
          className={`presence-${user.status ? user.status : "unknown"}`}
        />
      )}
    </Container>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  clickEvent: PropTypes.bool,
  hoverEvent: PropTypes.bool,
  user: PropTypes.object,
  showPresence: PropTypes.bool
};

Avatar.defaultProps = {
  size: "m",
  user: {
    name: {
      fullName: "Name missing"
    }
  }
};

export default Avatar;
