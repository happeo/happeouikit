import { css } from "styled-components";

import {
  desktopLower,
  desktopUpper,
  laptopLower,
  laptopUpper,
  tabletVerticalLower,
  tabletVerticalUpper,
  mobileLower,
  mobileUpper,
  mobileSmallLower,
  mobileSmallUpper
} from "./screenSizes";

const breakPoints = {
  xl: [desktopLower, desktopUpper],
  lg: [laptopLower, laptopUpper],
  md: [tabletVerticalLower, tabletVerticalUpper],
  sm: [mobileLower, mobileUpper],
  xs: [mobileSmallLower, mobileSmallUpper]
};

// MediaQuery generator.
const media = Object.keys(breakPoints).reduce(
  (accumulator, label) => {
    const minMedia = (strings, ...interpolations) => css`
      @media (min-width: ${props => breakPoints[label][1]}px) {
        ${css(strings, ...interpolations)}
      }
    `;

    const maxMedia = (strings, ...interpolations) => css`
      @media (max-width: ${props => breakPoints[label][1]}px) {
        ${css(strings, ...interpolations)}
      }
    `;

    const onlyMedia = (strings, ...interpolations) => css`
      @media (min-width: ${props =>
        breakPoints[label][0]} and max-width: ${props =>
      breakPoints[label][1]}px) {
        ${css(strings, ...interpolations)}
      }
    `;

    accumulator[label] =
      label === "xs" || label === "smaller" ? maxMedia : minMedia;
    accumulator.max[label] = maxMedia;
    accumulator.min[label] = minMedia;
    accumulator.only[label] = onlyMedia;

    return accumulator;
  },
  { min: {}, max: {}, only: {} }
);

export default media;
