import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { gutterWidth } from "./gutters";
import media from "../mediaQueries";
import css from "./css.Row";

const StyledRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-right: -${gutterWidth}px;
  margin-left: -${gutterWidth}px;

  ${p => p.alignItems && css.alignItems[p.alignItems]}
  ${p => p.smAlignItems && media.sm`${css.alignItems[p.smAlignItems]}`}
  ${p => p.mdAlignItems && media.md`${css.alignItems[p.mdAlignItems]}`}
  ${p => p.lgAlignItems && media.lg`${css.alignItems[p.lgAlignItems]}`}
  ${p => p.xlAlignItems && media.xl`${css.alignItems[p.xlAlignItems]}`}
  ${p => p.justifyContent && css.justifyContent[p.justifyContent]}
  ${p =>
    p.smJustifyContent && media.sm`${css.justifyContent[p.smJustifyContent]}`}
  ${p =>
    p.mdJustifyContent && media.md`${css.justifyContent[p.mdJustifyContent]}`}
  ${p =>
    p.lgJustifyContent && media.lg`${css.justifyContent[p.lgJustifyContent]}`}
  ${p =>
    p.xlJustifyContent && media.xl`${css.justifyContent[p.xlJustifyContent]}`}
}
`;

const alignmentEnum = ["start", "end", "center", "baseline", "stretch"];
const justifyEnum = ["start", "end", "center", "between", "around"];

const Row = ({ children, ...rest }) => (
  <StyledRow {...rest}>{children}</StyledRow>
);

Row.propTypes = {
  /** Mobile small and bigger. CSS rule for 'align-items'. */
  alignItems: PropTypes.oneOf(alignmentEnum),
  /** Mobile and bigger. CSS rule for 'align-items'. */
  smAlignItems: PropTypes.oneOf(alignmentEnum),
  /** Tablet and bigger. CSS rule for 'align-items'. */
  mdAlignItems: PropTypes.oneOf(alignmentEnum),
  /** Laptop and bigger. CSS rule for 'align-items'. */
  lgAlignItems: PropTypes.oneOf(alignmentEnum),
  /** Desktop and bigger. CSS rule for 'align-items'. */
  xlAlignItems: PropTypes.oneOf(alignmentEnum),

  /** Mobile small and bigger. CSS rule for 'justify-content'. */
  justifyContent: PropTypes.oneOf(justifyEnum),
  /** Mobile and bigger. CSS rule for 'justify-content'. */
  smJustifyContent: PropTypes.oneOf(justifyEnum),
  /** Tablet and bigger. CSS rule for 'justify-content'. */
  mdJustifyContent: PropTypes.oneOf(justifyEnum),
  /** Laptop and bigger. CSS rule for 'justify-content'. */
  lgJustifyContent: PropTypes.oneOf(justifyEnum),
  /** Desktop and bigger. CSS rule for 'justify-content'. */
  xlJustifyContent: PropTypes.oneOf(justifyEnum)
};

export default Row;
