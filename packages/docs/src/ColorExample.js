import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { sansFamily } from "@happeouikit/typography";

// IMPORTANT!
// In the docs thing we currently cannot use components that are in the library, so no typography or color packages..

const Box = styled.div`
  background-color: ${({ hex }) => (hex ? hex : "#ffffff")};
  color: ${({ darkText }) => (darkText ? "rgba(33,41,53,0.7)" : "#FFFFFF")};

  ${props =>
    props.border &&
    css`
      border: 1px solid #bacad5;
    `};

  width: 128px;
  height: 80px;
  border-radius: 4px;
  padding: 4px 8px;

  font-weight: 400;
  font-family: ${sansFamily};
  -webkit-font-smoothing: antialiased;
}`;

const Wrapper = styled.div`
  margin: 0 32px 32px 0;
  display: inline-block;
`;

const ColorTitle = styled.p`
  font-family: ${sansFamily};
  margin: 4px 0;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
`;

const ColorExample = ({ name, hex, darkText = false, border = false }) => (
  <Wrapper>
    <Box hex={hex} darkText={darkText} border={border}>
      <span>{name}</span>
    </Box>
    <ColorTitle>{hex}</ColorTitle>
  </Wrapper>
);

ColorExample.propTypes = {
  /** Name of the color */
  name: PropTypes.string.isRequired,
  /** Hexadecimal (or rgb/rgba) value of the color */
  hex: PropTypes.string.isRequired,
  /** Show dark text, usefull for light colors. Defaults to false. */
  darkText: PropTypes.bool,
  /** Show borded. Usefull for really really light colors on white background */
  border: PropTypes.bool
};

ColorExample.defaultProps = {
  border: false,
  darkText: false
};

export default ColorExample;
