import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { active, gray08, gray01 } from "@happeouikit/colors";
import { BodyUI } from "@happeouikit/typography";

const Switch = ({ label, ...props }) => {
  return (
    <ToggleSwitchWrapper>
      <input type="checkbox" {...props} />
      <StyledSwitch {...props} />
      {label && <Label>{label}</Label>}
    </ToggleSwitchWrapper>
  );
};

Switch.propTypes = {
  label: PropTypes.node
};

const StyledSwitch = styled.span`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: content-box;

  width: 40px;
  height: 20px;
  background-color: white;
  border: 2px solid ${gray08};
  border-radius: 13px;
  transition: 0.4s;

  :before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    border-radius: 50%;
    background-color: ${gray08};
    transition: 0.4s;
  }
`;
const ToggleSwitchWrapper = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  line-height: 33px;
  padding: 8px 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + ${StyledSwitch} {
    border: 2px solid ${active};
  }

  input:checked + ${StyledSwitch}:before {
    transform: translateX(20px);
    background: ${active};
  }

  input:disabled + ${StyledSwitch} {
    border-color: ${gray08};
    &:before {
      background: ${gray08};
    }
  }
`;

const Label = styled(BodyUI)`
  margin-left: 8px;
  color: ${gray01};
`;

export default Switch;
