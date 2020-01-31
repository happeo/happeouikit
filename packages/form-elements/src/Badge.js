import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TinyText } from "@happeouikit/typography";
import { toBgLight, active, white } from "@happeouikit/colors";

const Badge = ({ text, isFilled, color = active, applyCustomStylings }) => {
  return (
    <Wrapper color={color} isFilled={isFilled}>
      {applyCustomStylings ? (
        applyCustomStylings(text)
      ) : (
        <TinyText color={isFilled ? white : color} uppercase bold>
          {text}
        </TinyText>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  background: ${({ color, isFilled }) => (isFilled ? color : toBgLight(color))};
  padding: 4px 8px;
  border-radius: 100px;
`;

Badge.propTypes = {
  text: PropTypes.node.isRequired,
  isFilled: PropTypes.bool,
  color: PropTypes.string,
  applyCustomStylings: PropTypes.func
};

Badge.defaultProps = {
  color: active
};
export default Badge;
