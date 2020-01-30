/**
 *
 * Default Loader component
 *
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { lighten, active, success, alert, gray08 } from "@happeokit/colors";
import { IconCheck, IconDeleteCircle } from "@happeokit/icons";
import PropTypes from "prop-types";

const Spinner = ({ state }) => (
  <AnimationContainer>
    <SpinnerContainer>
      <LoadingSpinner state={state} />
    </SpinnerContainer>
    {state === "success" && (
      <SpinnerContainer>
        <SuccessCheck>
          <IconCheck fill={success} />
        </SuccessCheck>
      </SpinnerContainer>
    )}
    {state === "error" && (
      <SpinnerContainer>
        <ErrorCheck>
          <IconDeleteCircle fill={alert} />
        </ErrorCheck>
      </SpinnerContainer>
    )}
  </AnimationContainer>
);

Spinner.propTypes = {
  state: PropTypes.oneOf(["loading", "success", "error"])
};

Spinner.defaultProps = {
  state: "loading"
};

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(120deg);
  }
  40% {
    transform: rotate(240deg);
  }
  60% {
    transform: rotate(360deg);
  }
  80% {
    transform: rotate(490deg);
  }
  90% {
    transform: rotate(600deg);
  }
  100% {
    transform: rotate(720deg);
  }
`;
const scaleAndFadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
const AnimationContainer = styled.div`
  height: 64px;
  width: 100%;
  position: relative;
`;
const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const LoadingSpinner = styled.div`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  position: relative;
  border-top: 4px solid ${gray08};
  border-right: 4px solid ${gray08};
  border-bottom: 4px solid ${active};
  border-left: 4px solid ${active};
  transform: translateZ(0);
  opacity: ${props => (props.state === "loading" ? 1 : 0)};
  animation: ${spinnerAnimation} 2s infinite linear;
  transition: opacity 180ms;
`;
const SuccessCheck = styled.div`
  border-radius: 50%;
  width: 72px;
  height: 72px;
  background-color: ${lighten(success, 0.9)};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleAndFadeInAnimation} 180ms linear;
  svg {
    width: 40px;
    height: 40px;
  }
`;
const ErrorCheck = styled.div`
  border-radius: 50%;
  width: 72px;
  height: 72px;
  background-color: ${lighten(alert, 0.9)};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleAndFadeInAnimation} 180ms linear;
  svg {
    width: 40px;
    height: 40px;
  }
`;

export default Spinner;
