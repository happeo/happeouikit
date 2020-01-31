import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { BodyUI, TextZeta, TinyText } from "@happeouikit/typography";
import {
  active,
  white,
  gray01,
  gray04,
  gray07,
  gray06,
  alert,
  success,
  warn,
  darken,
  lighten,
  toBgLight,
  black,
  black20,
  black50,
  gray08,
  gray05
} from "@happeouikit/colors";

const IconGen = props => {
  const Icon = props.icon;
  if (Icon) {
    const iconDimensions = { width: "20px", height: "20px" };
    if (props.iconPosition) {
      return (
        <IconStyle iconPosition={props.iconPosition}>
          <Icon {...iconDimensions} />
        </IconStyle>
      );
    } else {
      return <Icon {...iconDimensions} />;
    }
  }
  return null;
};

const getTextComponent = size => {
  switch (size) {
    case "small":
      return TinyText;
    case "large":
      return TextZeta;
    default:
      return BodyUI;
  }
};

const Button = ({ icon, text, iconPosition, size, ...props }) => {
  const Text = getTextComponent(size);
  return (
    <button {...props}>
      <Wrapper>
        <IconGen icon={icon} iconPosition={iconPosition} />
        <Text color="inherit">{text}</Text>
      </Wrapper>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "alert", "warn"]),
  icon: PropTypes.func,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  type: "default",
  icon: null
};

const themeMap = {
  default: {
    enabled: active,
    hover: darken(active, 0.2),
    active: darken(active, 0.2)
  },
  alert: {
    enabled: alert,
    hover: darken(alert, 0.2),
    active: alert
  },
  success: {
    enabled: success,
    hover: darken(success, 0.2),
    active: success
  },
  warn: {
    enabled: warn,
    hover: darken(warn, 0.2),
    active: warn
  },
  dark: {
    enabled: black20,
    hover: black50,
    active: black
  }
};

const IconStyle = styled.div`
  float: ${props => props.iconPosition};
  margin: ${props =>
    props.iconPosition === "left" ? "0px 8px 0px 0px;" : "0px 0px 0px 8px;"};
`;

const ButtonBase = styled(Button)`
  border-radius: 6px;
  padding: 9px 16px;
  white-space: nowrap;
  color: ${white};
  cursor: pointer;
  box-shadow: none;
  text-shadow: none;
  border-color: transparent;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  outline: none;
  :active {
    transform: none;
    box-shadow: none;
    outline: none;
  }
  :disabled:hover {
    cursor: not-allowed;
    background: ${gray06};
  }
  :disabled {
    background: ${gray07};
  }
  :disabled:hover {
    box-shadow: none;
  }

  svg {
    margin-right: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonPrimary = styled(ButtonBase)`
  ${({ type = "default", icon = false }) =>
    `
      background: ${icon ? "transparent" : themeMap[type].enabled};
      color: ${icon ? themeMap[type].enabled : white};
      fill: ${icon ? themeMap[type].enabled : white};
      :hover {
       background: ${icon ? toBgLight(active) : themeMap[type].hover};
       }
      :active {
        background: ${icon ? toBgLight(active) : themeMap[type].active};
        box-shadow: none !important;
      }
      :focus {
        box-shadow: 0 0 0 1px ${lighten(active, 0.3)};
        border: 1px solid ${white};
      }
    `};
`;

export const ButtonSecondary = styled(ButtonBase)`
  background: transparent;
  border: 1px solid transparent;
  ${({ type = "default", icon = false }) =>
    `
    color: ${icon ? gray01 : themeMap[type].enabled};
    fill:  ${icon ? gray01 : themeMap[type].enabled};
    :hover {
      background: ${lighten(themeMap[type].enabled, 0.9)};
      color: ${themeMap[type].enabled};
      fill: ${themeMap[type].enabled};
    }
    :active {
      color: ${themeMap[type].active};
       fill: ${themeMap[type].active};
      background: ${lighten(themeMap[type].enabled, 0.8)};
      outline: none;
      border-color: transparent;
      box-shadow: none !important;
    }
    :disabled, :disabled:hover {
      color: ${gray06};
      background: transparent;
    }
   :focus {
      box-shadow: 0 0 0 1px ${lighten(active, 0.3)};
    }
   `};
`;

export const IconButton = ({ icon, className, isActionIcon, ...rest }) => {
  const Icon = icon;
  const iconDimensions = { width: "18px", height: "18px" };
  return (
    <IconButtonBase className={className} isActionIcon={isActionIcon} {...rest}>
      <Icon {...iconDimensions} />
    </IconButtonBase>
  );
};

const IconButtonBase = styled.button`
  background: transparent;
  padding: ${({ isActionIcon }) => (isActionIcon ? "3px" : "10px")};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  svg {
    vertical-align: top;
    font-size: 20px;
  }

  :active {
    outline: none;
    border: none !important;
    box-shadow: none !important;
  }

  :focus {
    outline: none;
  }

  :disabled,
  :disabled:hover {
    cursor: not-allowed;
  }
  ${({ type = "default", isActionIcon }) => {
    if (type === "dark") {
      return css`
        fill: ${gray08};
        color: ${gray08};
        background: ${themeMap[type].enabled};

        :hover {
          fill: ${white};
          background: ${isActionIcon ? "transparent" : themeMap[type].hover};
        }

        :active {
          fill: ${white};
          color: ${themeMap[type].active};
          background: ${isActionIcon ? "transparent" : themeMap[type].active};
        }

        :focus {
          background: ${isActionIcon ? "transparent" : themeMap[type].enabled};
          box-shadow: ${isActionIcon
            ? "none"
            : `0 0 0 1px ${lighten(active, 0.3)}`};
        }

        :disabled,
        :disabled:hover {
          background: ${themeMap[type].enabled};
          fill: ${gray05};
          color: ${gray05};
        }
      `;
    } else {
      return css`
        fill: ${gray04};
        color: ${gray04};

        :hover {
          fill: ${themeMap[type].active};
          color: ${themeMap[type].active};
          background: ${isActionIcon
            ? "transparent"
            : lighten(themeMap[type].enabled, 0.9)};
        }
        :active {
          fill: ${themeMap[type].active};
          color: ${themeMap[type].active};
          background: ${isActionIcon
            ? "transparent"
            : lighten(themeMap[type].enabled, 0.8)};
        }
        :focus {
          outline: none;
          box-shadow: ${isActionIcon
            ? "none"
            : `0 0 0 1px ${lighten(active, 0.3)}`};
        }
        :disabled,
        :disabled:hover {
          background: ${gray06};
          fill: ${white};
          color: ${white};
        }
      `;
    }
  }}
`;

export default Button;
