import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { gray01, white } from "@happeouikit/colors";
import { BodyUI } from "@happeouikit/typography";

class Tooltip extends React.Component {
  static rebuild() {
    ReactTooltip.rebuild();
  }

  static hide(target) {
    ReactTooltip.hide(target);
  }

  static show(target) {
    ReactTooltip.show(target);
  }

  render() {
    const { content, textColor = white, className, ...props } = this.props;

    if (props.children || props.getContent) {
      return <StyledTooltip {...props} className={className} />;
    } else {
      return (
        <StyledTooltip
          className={className}
          {...props}
          getContent={dataTip => (
            <BodyUI color={textColor || white}>{content || dataTip}</BodyUI>
          )}
        />
      );
    }
  }
}

const StyledTooltip = styled(ReactTooltip)`
  background-color: ${({ background }) => background || gray01} !important;
  &.place-top {
    &:after {
      border-top-color: ${({ background }) => background || gray01} !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
    }
  }
  &.place-bottom {
    &:after {
      border-bottom-color: ${({ background }) =>
        background || gray01} !important;
      border-bottom-style: solid !important;
      border-bottom-width: 6px !important;
    }
  }
  &.place-left {
    &:after {
      border-left-color: ${({ background }) => background || gray01} !important;
      border-left-style: solid !important;
      border-left-width: 6px !important;
    }
  }
  &.place-right {
    &:after {
      border-right-color: ${({ background }) =>
        background || gray01} !important;
      border-right-style: solid !important;
      border-right-width: 6px !important;
    }
  }

  &.__react_component_tooltip {
    padding: 8px 16px !important;
  }
`;

Tooltip.defaultProps = {
  effect: "solid",
  place: "top"
};

Tooltip.propTypes = {
  effect: PropTypes.oneOf(["float", "solid"]),
  place: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  background: PropTypes.string,
  textColor: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  getContent: PropTypes.func,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  disable: PropTypes.bool,
  id: PropTypes.string
};

export default Tooltip;
