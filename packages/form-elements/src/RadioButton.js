import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { white, active, gray06, gray01, gray08 } from "@happeouikit/colors";
import { TextZeta } from "@happeouikit/typography";

const RadioButton = ({ label, ...props }) => {
  return (
    <RadioButtonWrapper>
      <input type="radio" {...props} />
      <StyledRadioButton {...props} />
      {label && (
        <Label
          data-tip={props["data-tip"]}
          data-tip-disable={props["data-tip-disable"]}
        >
          {label}
        </Label>
      )}
    </RadioButtonWrapper>
  );
};

RadioButton.propTypes = {
  label: PropTypes.node
};

const StyledRadioButton = styled.span`
  position: absolute;
  height: 12px;
  width: 12px;
  background-color: ${white};
  border: 2px solid ${white};
  box-shadow: 0px 0px 0px 2px ${gray06};
  border-radius: 50%;
`;

const Label = styled(TextZeta)`
  display: inline-block;
  margin-left: 25px;
  color: ${gray01};
`;

const RadioButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;

  input {
    display: none;
  }

  input:checked ~ ${StyledRadioButton} {
    background: ${active};
    box-shadow: 0px 0px 0px 2px ${active};
  }

  input:disabled + ${StyledRadioButton} {
    cursor: not-allowed;
    box-shadow: 0px 0px 0px 2px ${gray08};
  }

  input:disabled ~ ${Label} {
    color: ${gray06};
    cursor: not-allowed;
  }
`;

export default RadioButton;
