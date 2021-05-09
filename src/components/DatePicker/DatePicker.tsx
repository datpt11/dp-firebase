import React, { FC, useState } from 'react';

import moment from 'moment';
import { DayPickerRangeController, DayPickerRangeControllerShape, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export interface DatePickerProps extends Pick<DayPickerRangeControllerShape, 'startDate' | 'endDate'> {
  onValueChange?: (arg: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => void;
  onInputFocus?: (focusedInput: FocusedInputShape | null) => void;
}

const DatePicker: FC<DatePickerProps> = ({ endDate, startDate, onValueChange, onInputFocus }) => {
  const [focusedInputState, setForcusedInputState] = useState<FocusedInputShape | null>('startDate');

  const handleFocus = (focusedInput: FocusedInputShape | null) => {
    setForcusedInputState('endDate');
    onInputFocus?.(focusedInput);
  };

  const handleDatesChange = (arg: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
    onValueChange?.(arg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <DayPickerRangeController
      noBorder
      numberOfMonths={2}
      focusedInput={focusedInputState}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={handleDatesChange}
      onFocusChange={handleFocus}
      initialVisibleMonth={() => moment()}
    />
  );
};

export default DatePicker;
