import React from "react";
import { DatePicker as AntdDatePicker } from "antd";

type DatePickerProps = React.ComponentProps<typeof AntdDatePicker> & {};

const DatePicker = ({ ...props }: DatePickerProps) => {
  return <AntdDatePicker {...props} />;
};
export default DatePicker;
