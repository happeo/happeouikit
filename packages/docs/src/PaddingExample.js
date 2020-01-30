import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InnerBox = styled.div`
  background: white;
  height: 100%;
`;

const OuterBox = styled.div`
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  height: 128px;
  max-width: 608px;
  background-color: rgba(237, 70, 71, 0.1);
`;

const PaddingExample = ({ padding }) => {
  const [name, value] = padding ? Object.entries(padding)[0] : [null, null];
  return (
    <div>
      <OuterBox padding={value}>
        <InnerBox> </InnerBox>
      </OuterBox>
      <p>{name}</p>
    </div>
  );
};

PaddingExample.propTypes = {
  /** Padding object. Easiest to "Shorthand property names" to get the variable name as padding name. See examples. */
  padding: PropTypes.object.isRequired
};

export default PaddingExample;
