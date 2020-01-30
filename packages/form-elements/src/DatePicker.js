import React from "react";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import { alert } from "@happeokit/colors";
import { TinyText } from "@happeokit/typography";
import DateTimePicker from "./DateTimePicker";
import { MONTH_RANGE } from "./constant";
import { msg } from "@happeokit/translations";
import messages from "./messages";
import { media } from "@happeokit/layout";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObject: moment(),
      selectedDay: undefined,
      selectedMonth: undefined,
      selectedYear: undefined
    };
  }

  createDayRange = () => {
    const current = moment().month(0);

    if (this.state.selectedMonth === 2 && this.state.selectedYear) {
      current.month(1).year(this.state.selectedYear);
    } else if (this.state.selectedMonth) {
      current.month(this.state.selectedMonth - 1);
    }

    const dayArr = [];
    for (let i = 1; i <= current.daysInMonth(); i++) {
      dayArr.push({ label: i.toString(), value: i });
    }

    return dayArr;
  };

  createYearRange = () => {
    const currentYear = moment(this.state.dateObject).year();
    const { maxYear, minYear } = this.props;
    let upperLimit = maxYear;
    let lowerLimit = minYear;

    if (!maxYear && !minYear) {
      upperLimit = currentYear;
      lowerLimit = moment(this.state.dateObject)
        .subtract(100, "year")
        .year();
    }

    const yearArr = [];
    for (let i = upperLimit; i >= lowerLimit; i--) {
      const currentYearString = moment()
        .year(i)
        .format("YYYY");
      yearArr.push({
        label: currentYearString,
        value: parseInt(currentYearString)
      });
    }

    return yearArr;
  };

  onDateChange = () => {
    const { selectedDay, selectedMonth, selectedYear } = this.state;

    if (!selectedDay || !selectedMonth) return;

    if (selectedYear) {
      if (!moment([selectedYear, selectedMonth - 1, selectedDay]).isValid()) {
        this.setState({ error: msg(messages.invalidDate) });
        return;
      }
    } else {
      if (
        selectedDay >
        moment()
          .month(selectedMonth - 1)
          .daysInMonth()
      ) {
        this.setState({ error: msg(messages.invalidDate) });
        return;
      }
    }

    this.setState({ error: null });
    const selectedFullDate = moment({
      year: selectedYear,
      month: selectedMonth - 1,
      day: selectedDay
    });

    if (this.props.onChange) this.props.onChange(selectedFullDate.toDate());
  };

  handleOnFieldChange = (value, field) => {
    this.setState(
      {
        ...(field === "day" && { selectedDay: value }),
        ...(field === "month" && { selectedMonth: value }),
        ...(field === "year" && { selectedYear: value })
      },
      this.onDateChange
    );
  };

  render() {
    if (this.props.mode === "date-time") {
      return <DateTimePicker onChange={this.props.onChange} />;
    }
    return (
      <Wrapper {...this.props}>
        <StyledPicker
          placeholder={msg(messages.day)}
          options={this.createDayRange(this.state.selectedMonth - 1)}
          styles={dayPickerContainer}
          onChange={({ value }) => this.handleOnFieldChange(value, "day")}
          state={this.state.error ? "error" : "default"}
        />
        <StyledPicker
          placeholder={msg(messages.month)}
          options={MONTH_RANGE}
          styles={monthPickerContainer}
          onChange={({ value }) => this.handleOnFieldChange(value, "month")}
          state={this.state.error ? "error" : "default"}
        />
        <StyledPicker
          placeholder={msg(messages.year)}
          options={this.createYearRange(this.state.dateObject)}
          styles={yearPickerContainer}
          onChange={({ value }) => this.handleOnFieldChange(value, "year")}
          state={this.state.error ? "error" : "default"}
        />
        {this.state.error && (
          <ErrorMessage color={alert}>{msg(messages.invalidDate)}</ErrorMessage>
        )}
      </Wrapper>
    );
  }
}

const dayPickerContainer = {
  container: base => ({
    ...base,
    flex: "1 3 auto"
  })
};
const monthPickerContainer = {
  container: base => ({
    ...base,
    flex: "3 1 auto",
    marginRight: 10,
    marginLeft: 10
  })
};
const yearPickerContainer = {
  container: base => ({
    ...base,
    flex: "1 3 auto"
  })
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;

  ${media.min.xs`
    flex-direction: row;
  `}
`;
const ErrorMessage = styled(TinyText)`
  margin: 8px 0;
  width: 100%;
`;
const StyledPicker = styled(Dropdown)`
  min-width: 90px;

  .dropdown__control {
    border-color: ${({ state }) => state === "error" && alert};
  }
`;

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  maxYear: (props, propName) => {
    if (props["minYear"] && !props[propName]) {
      return new Error("maxYear props is required when minYear is defined");
    }
  },
  minYear: (props, propName) => {
    if (props["maxYear"] && !props[propName]) {
      return new Error("minYear props is required when maxYear is defined");
    }
  },
  mode: PropTypes.string
};

export default DatePicker;
