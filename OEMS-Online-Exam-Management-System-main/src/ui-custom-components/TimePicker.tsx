import React from "react";
import { TimePicker as AntdTimePicker, TimePicker } from "antd";
import moment from "moment";

type TimePickerProps = React.ComponentProps<typeof AntdTimePicker> & {};


const DatePicker = (props: TimePickerProps) => {
  return (
    <AntdTimePicker
      defaultOpenValue={moment("00:00", "HH:mm")}
      {...props}
    />
  );
};
export default DatePicker;

export const RangePicker = TimePicker.RangePicker;
