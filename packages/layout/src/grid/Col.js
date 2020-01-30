import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gutterWidth } from "./gutters";
import cssRules from "./css.Col";
import media from "../mediaQueries";

function isNumber(val) {
  return typeof val === 'number';
}

const StyledCol = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: ${gutterWidth}px;
  padding-left: ${gutterWidth}px;
  
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;

  ${p => p.noGutter && cssRules.noGutter}
  ${p => p.col && cssRules.col[p.col === true ? "true" : p.col]}
  ${p => p.offset && cssRules.offset[p.offset]}
  ${p => p.auto && cssRules.col.auto}
  ${p => p.alignSelf && cssRules.alignSelf[p.alignSelf]}
  ${p => p.order && cssRules.order[p.order]}

  ${p => p.xs && media.xs`${cssRules.col[p.xs === true ? "true" : p.xs]}`}
  ${p =>
    p.xsOffset &&
    isNumber(p.xsOffset) &&
    media.xs`${cssRules.offset[p.xsOffset]}`}
  ${p => p.xsAuto && media.xs`${cssRules.col.auto}`}
  ${p => p.xsAlignSelf && media.xs`${cssRules.alignSelf[p.xsAlignSelf]}`}
  ${p => p.xsOrder && media.xs`${cssRules.order[p.xsOrder]}`}
  ${p => p.hiddenXsDown && media.max.xs`${cssRules.display.none}`}
  ${p => p.hiddenXsUp && media.min.xs`${cssRules.display.none}`}

  ${p => p.sm && media.sm`${cssRules.col[p.sm === true ? "true" : p.sm]}`}
  ${p =>
    p.smOffset &&
    isNumber(p.smOffset) &&
    media.sm`${cssRules.offset[p.smOffset]}`}
  ${p => p.smAuto && media.sm`${cssRules.col.auto}`}
  ${p => p.smAlignSelf && media.sm`${cssRules.alignSelf[p.smAlignSelf]}`}
  ${p => p.smOrder && media.sm`${cssRules.order[p.smOrder]}`}
  ${p => p.hiddenSmDown && media.max.sm`${cssRules.display.none}`}
  ${p => p.hiddenSmUp && media.min.sm`${cssRules.display.none}`}

  ${p => p.md && media.md`${cssRules.col[p.md === true ? "true" : p.md]}`}
  ${p =>
    p.mdOffset &&
    isNumber(p.mdOffset) &&
    media.md`${cssRules.offset[p.mdOffset]}`}
  ${p => p.mdAuto && media.md`${cssRules.col.auto}`}
  ${p => p.mdAlignSelf && media.md`${cssRules.alignSelf[p.mdAlignSelf]}`}
  ${p => p.mdOrder && media.md`${cssRules.order[p.mdOrder]}`}
  ${p => p.hiddenMdDown && media.max.md`${cssRules.display.none}`}
  ${p => p.hiddenMdUp && media.min.md`${cssRules.display.none}`}

  ${p => p.lg && media.lg`${cssRules.col[p.lg === true ? "true" : p.lg]}`}
  ${p =>
    p.lgOffset &&
    isNumber(p.lgOffset) &&
    media.lg`${cssRules.offset[p.lgOffset]}`}
  ${p => p.lgAuto && media.lg`${cssRules.col.auto}`}
  ${p => p.lgAlignSelf && media.lg`${cssRules.alignSelf[p.lgAlignSelf]}`}
  ${p => p.lgOrder && media.lg`${cssRules.order[p.lgOrder]}`}
  ${p => p.hiddenLgDown && media.max.lg`${cssRules.display.none}`}
  ${p => p.hiddenLgUp && media.min.lg`${cssRules.display.none}`}

  ${p => p.xl && media.xl`${cssRules.col[p.xl === true ? "true" : p.xl]}`}
  ${p =>
    p.xlOffset &&
    isNumber(p.xlOffset) &&
    media.xl`${cssRules.offset[p.xlOffset]}`}
  ${p => p.xlAuto && media.xl`${cssRules.col.auto}`}
  ${p => p.xlAlignSelf && media.xl`${cssRules.alignSelf[p.xlAlignSelf]}`}
  ${p => p.xlOrder && media.xl`${cssRules.order[p.xlOrder]}`}
  ${p => p.hiddenXlDown && media.max.xl`${cssRules.display.none}`}
  ${p => p.hiddenXlUp && media.min.xl`${cssRules.display.none}`}

}
`;

const Col = ({ children, ...rest }) => (
  <StyledCol {...rest}>{children}</StyledCol>
);
const colNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const alignSelfEnum = ["auto", "start", "end", "center", "baseline", "stretch"];
const orderEnum = ["first", "last", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

Col.propTypes = {
  /** Skip gutter from this column. */
  noGutter: PropTypes.bool,
  /** Column size 1-12. Equivalent to col-* (or col in case of true) */
  col: PropTypes.oneOf(colNums),
  /** Goes from 0 to 11. Equivalent to offset-* */
  offset: PropTypes.oneOf(colNums),
  /** Equivalent to col-auto */
  auto: PropTypes.bool,
  /** Equivalent to align-self-{value}. */
  alignSelf: PropTypes.oneOf(alignSelfEnum),
  /** Equivalent to order-{value} */
  order: PropTypes.oneOf(orderEnum),
  /** Column size for xs screens and up  */
  //xs: PropTypes.oneOf(colNums),
  ///** Goes from 0 to 11. Equivalent to offset-sm-* */
  //xsOffset: PropTypes.oneOf(orderEnum),
  ///** Equivalent to col-sm-auto */
  //xsAuto: PropTypes.bool,
  ///** Equivalent to align-self-sm-{value} */
  //xsAlignSelf: PropTypes.oneOf(alignSelfEnum),
  ///** Order of column based on screen size. */
  //xsOrder: PropTypes.oneOf(orderEnum),
  /** Hides content from xs breakpoint to 0. */
  hiddenXsDown: PropTypes.bool,
  /** Hides content from xs breakpoint to infinity */
  hiddenXsUp: PropTypes.bool,
  /** Goes from 1 to 12. Equivalent to col-sm-* (or col-sm in case of true)  */
  sm: PropTypes.oneOf(colNums),
  /** Goes from 0 to 11. Equivalent to offset-sm-* */
  smOffset: PropTypes.oneOf(colNums),
  /** Equivalent to col-sm-auto */
  smAuto: PropTypes.bool,
  /** Equivalent to align-self-sm-{value} */
  smAlignSelf: PropTypes.oneOf(alignSelfEnum),
  /** first or last or 0 to 12. Equivalent to order-sm-{value} */
  smOrder: PropTypes.oneOf(orderEnum),
  /** Hides content from sm breakpoint to infinity */
  hiddenSmDown: PropTypes.bool,
  /** Hides content from sm breakpoint to 0 */
  hiddenSmUp: PropTypes.bool,
  /** Goes from 1 to 12. Equivalent to col-md-* (or col-md in case of true) */
  md: PropTypes.oneOf(colNums),
  /** Goes from 0 to 11. Equivalent to offset-md-* */
  mdOffset: PropTypes.oneOf(colNums),
  /** Equivalent to col-md-auto */
  mdAuto: PropTypes.bool,
  /** Equivalent to align-self-md-{value} */
  mdAlignSelf: PropTypes.oneOf(alignSelfEnum),
  /** quivalent to order-md-{value}. */
  mdOrder: PropTypes.oneOf(orderEnum),
  /** Hides content from md breakpoint to 0. */
  hiddenMdDown: PropTypes.bool,
  /** Hides content from md breakpoint to infinity */
  hiddenMdUp: PropTypes.bool,
  /** Goes from 1 to 12. Equivalent to col-lg-* (or col-lg in case of true)  */
  lg: PropTypes.oneOf(colNums),
  /** Goes from 0 to 11. Equivalent to offset-lg-* */
  lgOffset: PropTypes.oneOf(colNums),
  /** Equivalent to col-lg-auto. */
  lgAuto: PropTypes.bool,
  /** Equivalent to align-self-lg-{value}. */
  lgAlignSelf: PropTypes.oneOf(alignSelfEnum),
  /** first or last or 0 to 12. Equivalent to order-lg-{value} */
  lgOrder: PropTypes.oneOf(orderEnum),
  /** Hides content from lg breakpoint to 0 */
  hiddenLgDown: PropTypes.bool,
  /** Hides content from lg breakpoint to infinity */
  hiddenLgUp: PropTypes.bool,
  /** Column size from 1 to 12. Equivalent to col-xl-* (or col-xl in case of true)  */
  xl: PropTypes.oneOf(colNums),
  /** Goes from 0 to 11. Equivalent to offset-xl-* */
  xlOffset: PropTypes.oneOf(colNums),
  /** Equivalent to col-xl-auto */
  xlAuto: PropTypes.bool,
  /** Equivalent to align-self-xl-{value} */
  xlAlignSelf: PropTypes.oneOf(alignSelfEnum),
  /** first or last or 0 to 12. Equivalent to order-xl-{value}. */
  xlOrder: PropTypes.oneOf(orderEnum),
  /** Hides content from xl breakpoint to 0. */
  hiddenXlDown: PropTypes.bool,
  /** Hides content from xl breakpoint to infinity. */
  hiddenXlUp: PropTypes.bool
};

export default Col;
