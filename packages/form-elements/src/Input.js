import React from "react";
import styled from "styled-components";
import { placeholder } from "polished";
import {
  gray01,
  gray04,
  gray08,
  gray05,
  gray06,
  active,
  black,
  success,
  alert
} from "@happeokit/colors";
import { TinyText, sansFamily, BodyUI } from "@happeokit/typography";

/**
 * Map input states to colors
 * @type {{default: string, success: string, error: string}}
 */
const inputStates = {
  success: success,
  error: alert,
  default: gray06
};

export const Input = ({
  label,
  icon,
  iconProps,
  state,
  errorMessage,
  ...rest
}) => {
  return (
    <Container>
      {!!label && (
        <InputLabel>
          <BodyUI color={gray01}>{label}</BodyUI>
        </InputLabel>
      )}

      {icon && new iconWrapper(icon, iconProps)()}
      <StyledInput hasIcon={(icon || "").toString()} state={state} {...rest} />

      {state === "error" && errorMessage && (
        <ErrorMessage color={alert}>{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

/**
 * HOC for customizing Icon components for input
 * @param IconComponent
 * @param iconProps
 * @returns {function(): *}
 */
function iconWrapper(IconComponent, iconProps) {
  const iconDefaults = {
    width: "18px",
    height: "18px",
    fill: black
  };

  const style = {
    position: "absolute",
    top: "12px",
    left: "12px",
    fontSize: "18px"
  };
  const props = Object.assign({}, iconDefaults, iconProps);

  return function() {
    return (
      <InputIconWrapper>
        <IconComponent {...props} style={style} />
      </InputIconWrapper>
    );
  };
}

const ErrorMessage = styled(TinyText)`
  margin: 8px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
const InputLabel = styled.div`
  margin: 4px 0;
`;

export const StyledInput = styled.input.attrs({ type: "text" })`
  ${placeholder({
    "font-family": sansFamily,
    color: gray05,
    "letter-spacing": "-0.3px",
    "font-size": "14px",
    "font-weight": "normal"
  })};
  font-family: ${sansFamily};
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: solid 1px ${gray06};
  box-sizing: border-box;
  box-shadow: none;
  font-size: 14px;
  padding: ${({ hasIcon }) => (hasIcon ? "10px 12px 10px 38px" : "10px 12px")};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.3px;
  color: ${black};

  :hover {
    border-color: ${({ state = "default" }) =>
      state === "default" ? gray04 : inputStates[state]};
  }

  :active {
    outline: none;
    box-shadow: none;
    border-color: ${({ state = "default" }) =>
      state === "default" ? active : inputStates[state]};
  }

  :focus {
    outline: none;
    border-color: ${({ state = "default" }) =>
      state === "default" ? active : inputStates[state]};
  }

  :disabled {
    border: solid 1px ${gray08};
    color: ${gray05};

    ${placeholder({
      color: gray05
    })}
  }

  border-color: ${({ state = "default" }) => inputStates[state]};
`;

const InputIconWrapper = styled.span`
  position: relative;
`;

/**
 * Number Input
 */
export const InputNumber = ({ label, ...props }) => {
  return (
    <InputNumberContainer>
      <StyledInputNumber {...props} />
      {label && <InputNumberLabel>{label}</InputNumberLabel>}
    </InputNumberContainer>
  );
};

const StyledInputNumber = styled(Input).attrs({
  pattern: "[0-9.]+"
})`
  width: 40px;
  text-align: center;
  font-size: 14px;
`;

const InputNumberContainer = styled.div`
  display: flex;
  align-items: center;

  ${Container} {
    width: auto;
  }
`;

const InputNumberLabel = styled(BodyUI)`
  color: ${gray01};
  margin-left: 10px;
`;
