import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// IMPORTANT!
// In the docs thing we currently cannot use components that are in the library, so no typography or color packages..

const Row = styled.div`
  display: flex;
  align-items: row;
`;

const ColorBox = styled.div`
  background-color: ${({ color }) => (color ? color : "transparent")};
  width: 112px;
  height: 64px;
  padding: 4px 8px;
  font-size: 14px;

  > * {
    opacity: 0;
    color: white;
  }

  &:hover > * {
    opacity: 1;
  }
`;

const ShaderWrapper = styled.div`
  max-width: 100%;
  overflow: scroll;
  margin-bottom: 32px;
`;

const ShadedRow = ({ colors = {}, shaderFn, shaderName }) => {
  if (typeof shaderFn !== "function")
    throw Error("You must give a function as shader!");
  const columns = Object.entries(colors).map(([colorName, colorValue]) => (
    <ColorBox key={colorName} color={shaderFn(colorValue)}>
      <span>{`${shaderName}(${colorName})`}</span>
      <br />
      <span>{colorValue}</span>
    </ColorBox>
  ));
  return <Row>{columns}</Row>;
};

const ShadeGrid = ({ colors = {}, shadeFns = {} }) => {
  const rows = Object.entries(shadeFns).map(([shaderName, shaderFn]) => (
    <ShadedRow
      key={shaderName}
      shaderFn={shaderFn}
      shaderName={shaderName}
      colors={colors}
    />
  ));

  return <ShaderWrapper>{rows}</ShaderWrapper>;
};

ShadeGrid.propTypes = {
  /** Colors object. Best to "Shorthand property names" to get the variable name as color name. `const colors = { lila, violet }`. */
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
  /** Shader Functions object. Best to "Shorthand property names" to get the variable name as color name. `const colors = { darken80, lighten70 }`. */
  shadeFns: PropTypes.objectOf(PropTypes.func).isRequired
};

export default ShadeGrid;
