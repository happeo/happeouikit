/**
 *
 * Default Loader component
 *
 */
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { gray01, white } from "@happeokit/colors";
import PropTypes from "prop-types";

const Loader = ({ size, light, containerHeight, containerWidth }) => {
  return (
    <LoaderDiv height={containerHeight} width={containerWidth}>
      <Bounce1 size={size} light={light} />
      <Bounce2 size={size} light={light} />
      <Bounce3 size={size} light={light} />
    </LoaderDiv>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  light: PropTypes.bool,
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string
};

Loader.defaultProps = {
  size: "small",
  light: false,
  containerHeight: "200px",
  containerWidth: "100%"
};

export default Loader;

const bounceDelay = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const animationRule = css`
  ${bounceDelay} 1.4s infinite ease-in-out;
`;

const LoaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ height }) => height || "200px"};
  text-align: center;
  width: ${({ width }) => width || "100%"};
`;

const Bounce = styled.div`
  width: 8px;
  height: 8px;

  ${({ size }) => {
    switch (size) {
      case "small":
        return;
      case "medium":
        return "width: 16px;height: 16px";
      case "large":
        return "width: 24px;height: 24px";
      default:
        return;
    }
  }};

  background-color: ${props => (props.light ? white : gray01)};
  border-radius: 100%;
  display: inline-block;
  animation: ${animationRule};
  /* Prevent first frame from flickering when animation starts */
  animation-fill-mode: both;
`;

const Bounce1 = styled(Bounce)`
  animation-delay: -0.32s;
`;

const Bounce2 = styled(Bounce)`
  animation-delay: -0.16s;
`;

const Bounce3 = styled(Bounce)`
  animation-delay: -0s;
`;
