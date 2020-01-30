import React, {
  Fragment,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import styled, { css } from "styled-components";
import Select, { components } from "react-select";
import { IconArrowDropDown } from "@happeokit/icons";
import {
  active,
  gray01,
  gray06,
  gray05,
  toBgLight,
  gray04
} from "@happeokit/colors";
import { BodyUI, sansFamily } from "@happeokit/typography";
import { screen } from "@happeokit/theme";

const Dropdown = ({ label, ...props }, ref) => {
  const dropdownRef = useRef();
  useImperativeHandle(ref, () => ({
    setValue: value => dropdownRef.current.select.setValue(value)
  }));

  return (
    <Fragment>
      {!!label && (
        <Label>
          <BodyUI color={gray01}>{label}</BodyUI>
        </Label>
      )}
      <StyledDropdown
        classNamePrefix="dropdown"
        components={{ DropdownIndicator }}
        hideOnMobile={props.hideOnMobile}
        ref={dropdownRef}
        {...props}
      />
    </Fragment>
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <IconArrowDropDown width="24px" height="24px" fill={gray06} />
      </components.DropdownIndicator>
    )
  );
};

export const dropdownStyles = css`
  min-width: 200px;
  width: auto;

  font-family: ${sansFamily};
  letter-spacing: -0.3px;
  font-size: 14px;
  font-weight: normal;

  :hover {
    cursor: pointer;
  }

  .dropdown {
    &__indicator-separator {
      display: none;
    }

    &__control {
      border: 1px solid ${gray06};
      box-shadow: none;

      :hover {
        border-color: ${gray04};
      }

      :active {
        outline: none;
        border-color: ${active};
      }

      :focus {
        outline: none;
        border-color: ${active};
      }

      &--is-focused,
      &--is-focused:active {
        outline: none !important;
        border: 1px solid ${active} !important;
        box-shadow: none;
      }
    }

    &__input {
      input {
        box-shadow: none !important;
      }
    }

    &__menu {
      .dropdown__option--is-focused:not(.dropdown__option--is-selected) {
        background: ${toBgLight(active)};
      }
    }

    &__placeholder {
      font-family: ${sansFamily};
      color: ${gray05};
      letter-spacing: -0.3px;
      font-size: 14px;
      font-weight: normal;
    }
  }

  @media ${screen.onlyXs} {
    ${({ hideOnMobile }) => hideOnMobile && ` display: none;`};
  }
`;

const StyledDropdown = styled(Select)`
  ${dropdownStyles}
`;

const Label = styled.div`
  margin: 4px 0;
`;

export default forwardRef(Dropdown);
