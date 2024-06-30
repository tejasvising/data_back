import React from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
const AntDOption = Select.Option;

type OptionProps = React.ComponentProps<typeof AntDOption>;

const Option: React.FC<OptionProps> = ({ children, ...props }) => {
  return <AntDOption {...props}>{children}</AntDOption>;
};
export default Option;
