import React from "react";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import Dropdown from "./Dropdown";
import debounce from "lodash.debounce";
import { Input } from "./Input";
import { IconArrowDropDown } from "@happeokit/icons";
import { components } from "react-select";
import { gray06, active, black70, lighten, white } from "@happeokit/colors";
import { sansFamily } from "@happeokit/typography";
import messages from "./messages";
import "react-day-picker/lib/style.css";

const TIME_REGEX = /^\d{4}$/g;

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <IconArrowDropDown width="24px" height="24px" fill={gray06} />
      </components.DropdownIndicator>
    )
  );
};

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: undefined,
      selectedTime: undefined,
      mode: "am",
      timeInputState: "default",
      timeInputErrorMessage: undefined,
      timeValue: ""
    };

    this.handleTimeSelectedDebounced = debounce(
      this.handleTimeSelected.bind(this),
      500
    );

    this.calendarRef = React.createRef();
  }

  handleDateSelected = date => {
    const newDate = moment(date);
    const selectedDate = {
      label: newDate.format("MMMM Do YYYY"),
      value: newDate
    };

    this.setState({ selectedDate }, () => {
      this.calendarRef.current.setValue(selectedDate);
      this.setDateTime();
    });
  };

  handleTimeSelected = time => {
    if (time.length !== 2) {
      this.setState({
        timeInputState: "error",
        timeInputErrorMessage: messages.wrongFormat
      });
      return;
    }

    this.setState({ selectedTime: time }, this.setDateTime);
  };

  validateTime = time => {
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);

    if (isNaN(hour) || isNaN(minute)) {
      this.setState({
        timeInputState: "error",
        timeInputErrorMessage: messages.notNumber
      });
      return false;
    }
    if ((this.state.mode !== "24h" && hour > 12) || hour > 23 || minute > 59) {
      this.setState({
        timeInputState: "error",
        timeInputErrorMessage: messages.invalidTime
      });
      return false;
    }

    this.setState({ timeInputState: "default" });
    return true;
  };

  onChangeMode = ({ value }) => {
    this.setState({ mode: value }, this.setDateTime);
  };

  onChangeTime = event => {
    const timeString = event.target.value;
    let newTime = timeString;
    this.setState({ timeInputState: "default" });

    if (timeString.match(TIME_REGEX)) {
      newTime = timeString.slice(0, 2) + ":" + timeString.slice(2);
    }
    this.setState({ timeValue: newTime });

    this.handleTimeSelectedDebounced(newTime.split(":"));
  };

  openMenu = () => {
    if (!this.state.menuIsOpen) this.setState({ menuIsOpen: true });
  };

  setDateTime = () => {
    const { selectedDate, selectedTime, mode } = this.state;
    if (!selectedTime || !mode) return;
    if (!this.validateTime(selectedTime)) return;

    if (!selectedDate) return;

    const hour = parseInt(selectedTime[0]);
    const minute = parseInt(selectedTime[1]);

    const selectedDateTime = moment(selectedDate.value);

    if (mode === "am" && hour === 12) {
      selectedDateTime.hour(0);
    } else if (mode === "pm" && hour === 12) {
      selectedDateTime.hour(12);
    } else if (mode === "pm") {
      selectedDateTime.hour(hour + 12);
    } else {
      selectedDateTime.hour(hour);
    }

    selectedDateTime.minute(minute);

    this.setState({ error: null });
    if (this.props.onChange) this.props.onChange(selectedDateTime.toDate());
  };

  render() {
    const { intl } = this.props;
    let modifiers, modifiersStyles;

    if (this.state.selectedDate) {
      modifiers = {
        selectedDate: this.state.selectedDate.value.toDate()
      };
      modifiersStyles = {
        selectedDate: {
          color: white,
          backgroundColor: active
        }
      };
    }

    return (
      <Wrapper>
        <InputWrapper>
          <StyledDropdown
            width={259}
            components={{
              DropdownIndicator,
              Option: () => (
                <StyledDayPicker
                  onDayClick={this.handleDateSelected}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                />
              )
            }}
            options={[{}]}
            isSearchable={false}
            placeholder={messages.selectDate}
            label={messages.calendarLabel}
            ref={this.calendarRef}
          />
        </InputWrapper>

        <TimeInputs>
          <InputWrapper>
            <Input
              placeholder={messages.timeInputPlaceholder}
              label={messages.timeInputLabel}
              onChange={this.onChangeTime}
              state={this.state.timeInputState}
              errorMessage={this.state.timeInputErrorMessage}
              value={this.state.timeValue}
            />
          </InputWrapper>

          <InputWrapper>
            <Spacer />
            <StyledDropdown
              options={[
                { value: "am", label: messages.am },
                { value: "pm", label: messages.pm },
                { value: "24h", label: messages.twentyFourHour }
              ]}
              defaultValue={{ value: "am", label: messages.am }}
              onChange={this.onChangeMode}
            />
          </InputWrapper>
        </TimeInputs>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 463px;
  min-width: 267px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TimeInputs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1 0 196px;
  max-width: 267px;

  & > div {
    flex: 1;
  }
`;

const Spacer = styled.div`
  height: 28px;
`;

const InputWrapper = styled.div`
  margin-right: 8px;
  margin-top: 5px;
`;

const StyledDropdown = styled(Dropdown)`
  width: ${({ width }) => (width ? `${width}px` : null)};
  min-width: 0;
  height: 40px;

  .dropdown {
    &__indicator {
      padding: 7px;
    }
  }
`;

const StyledDayPicker = styled(DayPicker)`
  .DayPicker {
    &-Caption {
      text-align: center;
    }

    &-Caption > div {
      font-size: 16px;
      font-weight: bold;
      font-family: ${sansFamily};
      letter-spacing: -0.3px;
    }

    &-Month {
      margin: 16px;
      border-collapse: separate;
      border-spacing: 5px;
    }

    &-Weekday {
      font-size: 12px;
      color: ${gray06};
    }

    &-Day {
      font-size: 12px;
      padding: 5px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-family: ${sansFamily};
    }

    &-Day:hover:not(.DayPicker-Day--outside) {
      background-color: ${lighten(active, 90)};
    }

    &-Day--today {
      color: black;
      font-weight: normal;
    }

    &-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      background-color: ${active};
      color: white;
    }

    &-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
      background-color: ${lighten(active, 30)};
    }

    &-NavButton {
      height: 12px;
      width: 12px;
      margin-top: 6px;
      background-color: ${black70};
    }
    &-NavButton:hover {
      opacity: 1;
      background-color: ${active};
    }

    &-NavButton--prev {
      left: 24px;
      right: auto;
      clip-path: polygon(70% 20%, 40% 50%, 70% 80%, 60% 90%, 20% 50%, 60% 10%);
      -webkit-clip-path: polygon(
        70% 20%,
        40% 50%,
        70% 80%,
        60% 90%,
        the 20% 50%,
        60% 10%
      );
      background-image: none;
    }
    &-NavButton--next {
      left: auto;
      right: 24px;
      clip-path: polygon(30% 10%, 70% 50%, 30% 90%, 20% 80%, 50% 50%, 20% 20%);
      -webkit-clip-path: polygon(
        30% 10%,
        70% 50%,
        30% 90%,
        20% 80%,
        50% 50%,
        20% 20%
      );
      background-image: none;
    }
  }
`;

DateTimePicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default DateTimePicker;
