import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { white, active, gray01, gray06 } from "@happeouikit/colors";
import { BodyUI } from "@happeouikit/typography";

const Checkbox = ({ label, background, ...props }) => {
  return (
    <CheckboxWrapper background={background}>
      <input type="checkbox" {...props} />
      <StyledCheckbox {...props} />
      {label && <Label>{label}</Label>}
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  label: PropTypes.node
};

const StyledCheckbox = styled.span`
  cursor: pointer;
  position: absolute;
  height: 12px;
  width: 12px;
  border-radius: 4px;
  background-color: ${white};
  border: 2px solid ${gray06};

  :after {
    content: "";
    position: absolute;
    top: 1px;
    left: 4px;
    width: 2px;
    height: 6px;
    border: solid ${white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;

  input {
    display: none;
  }

  input:checked + ${StyledCheckbox} {
    background: ${({ background }) => background || active};
    border: ${({ background }) => `2px solid ${background || active}`};
  }

  input:checked + ${StyledCheckbox}:after {
    display: block;
  }
`;

const Label = styled(BodyUI)`
  display: inline-block;
  position: relative;
  margin-left: 25px;
  color: ${gray01};
`;

export default Checkbox;
