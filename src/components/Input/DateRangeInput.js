import React, { useState } from "react";
import moment from "moment";
import { DateRangePicker } from "react-dates";

export const DateRangeInput = ({ startDate, endDate, handleDateChange }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <DateRangePicker
      noBorder={true}
      small={true}
      displayFormat={() => "DD/MM/YYYY"}
      showClearDates={true}
      startDate={startDate ? moment(startDate) : null}
      startDateId="startDateId"
      startDatePlaceholderText="Start Date"
      endDate={endDate ? moment(endDate) : null}
      endDateId="endDateId"
      endDatePlaceholderText=" End Date"
      isOutsideRange={() => null}
      onDatesChange={handleDateChange}
      focusedInput={focusedInput}
      onFocusChange={focusedInput => setFocusedInput(focusedInput)}
    />
  );
};
