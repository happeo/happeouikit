import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Box = styled.div`
  height: ${({ margin }) => margin};
  background-color: rgba(237, 70, 71, 0.1);
`;

const MarginExample = ({ margin }) => {
  const [name, value] = margin ? Object.entries(margin)[0] : [null, null];
  if (!name) return <p>No margin provided as an object.</p>;
  return (
    <div>
      <Box margin={value} />
      <p>{name}</p>
    </div>
  );
};

MarginExample.propTypes = {
  /** Margin object. Easiest to "Shorthand property names" to get the variable name as margin name. See examples. */
  margin: PropTypes.object.isRequired
};

export default MarginExample;
