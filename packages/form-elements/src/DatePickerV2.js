import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import "moment/locale/en-gb";

import { sansFamily, TextZeta } from "@happeokit/typography";
import {
  gray06,
  black,
  active,
  gray01,
  toBgLight,
  white,
  gray03
} from "@happeokit/colors";
import { Spacer } from "@happeokit/layout";
import { IconButton } from "@happeokit/buttons";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar
} from "@happeokit/icons";
import { shadow500 } from "@happeokit/theme";

// CSS
import "react-day-picker/lib/style.css";

const DatePickerV2 = ({
  label,
  locale,
  width,
  date,
  type,
  fromMonth,
  disabledDays,
  ...props
}) => {
  const { to, from } = date;
  return (
    <Wrapper width={width} hasRange={Boolean(to)}>
      {label && (
        <Fragment>
          <TextZeta>{label}</TextZeta>
          <Spacer height="4px" />
        </Fragment>
      )}
      <DayPickerInput
        component={props => <CustomInput {...props} />}
        value={date[type] && moment(date[type]).format("L")}
        key={date[type]}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date(), "L", "en-gb")}`}
        dayPickerProps={{
          locale: locale || "en-gb",
          localeUtils: MomentLocaleUtils,
          className: "Range",
          disabledDays: type === "to" ? { before: from } : {},
          modifiers: { before: from, after: to },
          selectedDays: [from, { from, to }],
          navbarElement: <CustomNavbar />,
          showOutsideDays: true,
          fromMonth
        }}
        {...props}
      />
    </Wrapper>
  );
};

DatePickerV2.propTypes = {
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  width: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fromMonth: PropTypes.object
};

const CustomNavbar = ({ month, onPreviousClick, onNextClick }) => {
  return (
    <NavBarContainer>
      <IconButton
        icon={IconChevronLeft}
        isActionIcon
        onClick={() => onPreviousClick()}
      />
      <TextZeta bold>{moment(month).format("MMMM YYYY")}</TextZeta>
      <IconButton
        icon={IconChevronRight}
        isActionIcon
        onClick={() => onNextClick()}
      />
    </NavBarContainer>
  );
};

const CustomInput = props => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconCalendar
        style={{
          position: "absolute",
          paddingLeft: "10px",
          fill: gray03,
          height: "20px",
          width: "20px",
          boxSizing: "content-box"
        }}
      />
      <input {...props} />
    </div>
  );
};

const borderRadius = "100px";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "200px"};

  .DayPickerInput-Overlay {
    margin-top: 8px;
    box-shadow: ${shadow500};
  }

  .DayPickerInput {
    .Range {
      .DayPicker-Day {
        &.DayPicker-Day--selected:not(.DayPicker-Day--before):not(.DayPicker-Day--after) {
          background-color: ${toBgLight(active)};
          border-radius: 0;
          &:not(.DayPicker-Day--outside) {
            color: ${gray01};
          }
        }
        &.DayPicker-Day--selected {
          background-color: ${active};
        }

        &.DayPicker-Day--before {
          position: relative;

          ${({ hasRange }) =>
            hasRange &&
            `
          ::before {
            content: "";
            position: absolute;
            background-color: ${toBgLight(active)};
            width: 10px;
            height: 32px;
            top: 0;
            right: 0;
            z-index: -1;
          }
        `}
        }
        &.DayPicker-Day--after {
          position: relative;
          ${({ hasRange }) =>
            hasRange &&
            `
          ::before {
            content: "";
            position: absolute;
            background-color: ${toBgLight(active)};
            width: 10px;
            height: 32px;
            top: 0;
            left: 0;
            z-index: -1;
          }
        `}
        }
        &.DayPicker-Day--today:not(.DayPicker-Day--selected) {
          color: ${active};
        }

        &.DayPicker-Day--outside {
          &.DayPicker-Day--before,
          &.DayPicker-Day--after {
            color: ${white};
          }
        }
      }
    }
    input {
      font-family: ${sansFamily};
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: solid 1px ${gray06};
      box-sizing: border-box;
      box-shadow: none;
      font-size: 14px;
      padding: 10px 40px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.43;
      letter-spacing: 0.3px;
      color: ${black};

      :hover {
        border-color: ${gray06};
      }

      :active {
        outline: none;
        box-shadow: none;
        border-color: ${active};
      }

      :focus {
        outline: none;
        border-color: ${active};
      }
    }

    .DayPicker-wrapper {
      font-family: ${sansFamily};
      color: ${gray01};
      letter-spacing: -0.3px;
      font-size: 14px;
      font-weight: normal;
    }

    .DayPicker-Week {
      .DayPicker-Day--selected:not(.DayPicker-Day--before):not(.DayPicker-Day--after) {
        &:first-child {
          border-top-left-radius: ${borderRadius} !important;
          border-bottom-left-radius: ${borderRadius} !important;
        }
        &:last-child {
          border-top-right-radius: ${borderRadius} !important;
          border-bottom-right-radius: ${borderRadius} !important;
        }
      }

      .DayPicker-Day--selected {
        &:first-child {
          &.DayPicker-Day--after {
            ::before {
              content: none;
            }
          }
        }
        &:last-child {
          &.DayPicker-Day--before {
            ::before {
              content: none;
            }
          }
        }
      }
    }

    .DayPicker-Caption {
      display: none;
    }
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
`;
export default DatePickerV2;
