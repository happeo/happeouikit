import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { gutterWidth, gutterWidthMedium, gutterWidthLarge } from "./gutters";
import media from "../mediaQueries";

const StyledContainer = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding-right: ${gutterWidth}px;
  padding-left: ${gutterWidth}px;
  margin-right: auto;
  margin-left: auto;

  ${props =>
    !props.fluid &&
    `
      ${media.min.sm`
        max-width: 384px;
      `}

      ${media.min.md`
        max-width: 720px;
        padding-right: ${gutterWidthMedium}px;
        padding-left: ${gutterWidthMedium}px;
      `}

      ${media.min.lg`
        max-width: 928px;
        padding-right: ${gutterWidthLarge}px;
        padding-left: ${gutterWidthLarge}px;
      `}


      ${media.min.xl`
        max-width: 1812px;
        padding-right: ${gutterWidthLarge}px;
        padding-left: ${gutterWidthLarge}px;
      `}
    `}
`;

const Container = ({ children, ...rest }) => (
  <StyledContainer {...rest}>{children}</StyledContainer>
);

Container.propTypes = {
  fluid: PropTypes.bool
};

export default Container;
