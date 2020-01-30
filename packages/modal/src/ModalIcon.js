import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconCheck, IconClose, IconDelete } from "@happeokit/icons";
import { alert, success, toBgLight } from "@happeokit/colors";
import { MODAL_STATES as STATES } from "./constants";

/**
 *
 * ModalIcon
 *
 */
const ModalIcon = ({ state }) => {
  let color, Icon;

  switch (state) {
    case STATES.success:
      color = success;
      Icon = IconCheck;
      break;
    case STATES.alert:
      color = alert;
      Icon = IconClose;
      break;
    case STATES.delete:
      color = alert;
      Icon = IconDelete;
      break;
    default:
      color = success;
      Icon = IconCheck;
  }

  return (
    <IconWrapper color={color}>
      <Icon fontSize="large" />
    </IconWrapper>
  );
};

ModalIcon.propTypes = {
  state: PropTypes.oneOf(["alert", "delete", "success"])
};

const IconWrapper = styled.div`
  display: flex;
  background: ${({ color }) => toBgLight(color)};
  padding: 16px 18px;
  border-radius: 50%;

  svg {
    fill: ${({ color }) => color};
    font-size: 42px;
  }
`;

export default ModalIcon;
