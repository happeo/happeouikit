import styled from "styled-components";
import { radius400 } from "../rectangles";
import {
  dropFade,
  fadeInOut,
  fadeIn,
  scaleAndFadeIn,
  scaleAndFadeOut,
  animationCurve,
  animationFast,
  animationSlow
} from "../animations";

export const ElementDropFade = styled.div`
  margin: 16px;
  width: 40px;
  height: 40px;
  border-radius: ${radius400};
  background-color: green;
  animation: ${dropFade}
    ${({ duration }) =>
      duration === "fast"
        ? animationFast
        : duration === "slow"
        ? animationSlow
        : duration}
    ${animationCurve} infinite;
`;
export const ElementFadeInOut = styled.div`
  margin: 16px;
  width: 40px;
  height: 40px;
  border-radius: ${radius400};
  background-color: green;
  animation: ${fadeInOut}
    ${({ duration }) =>
      duration === "fast"
        ? animationFast
        : duration === "slow"
        ? animationSlow
        : duration}
    ${animationCurve} infinite;
`;
export const ElementFadeIn = styled.div`
  margin: 16px;
  width: 40px;
  height: 40px;
  border-radius: ${radius400};
  background-color: green;
  animation: ${fadeIn}
    ${({ duration }) =>
      duration === "fast"
        ? animationFast
        : duration === "slow"
        ? animationSlow
        : duration}
    ${animationCurve} infinite;
`;
export const ElementScaleAndFadeIn = styled.div`
  margin: 16px;
  width: 40px;
  height: 40px;
  border-radius: ${radius400};
  background-color: green;
  animation: ${scaleAndFadeIn}
    ${({ duration }) =>
      duration === "fast"
        ? animationFast
        : duration === "slow"
        ? animationSlow
        : duration}
    ${animationCurve} infinite;
`;
export const ElementScaleAndFadeOut = styled.div`
  margin: 16px;
  width: 40px;
  height: 40px;
  border-radius: ${radius400};
  background-color: green;
  animation: ${scaleAndFadeOut}
    ${({ duration }) =>
      duration === "fast"
        ? animationFast
        : duration === "slow"
        ? animationSlow
        : duration}
    ${animationCurve} infinite;
`;
