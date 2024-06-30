import React from "react";
import { Select as AntDSelect } from "antd";
// import { ReactNode } from "react";
import classnames from "classnames";

import "antd/dist/antd.css";
//import "./Select.scss";

type SelectProps = React.ComponentProps<typeof AntDSelect> & {
  wrapOptions?: boolean;
};

const Select: React.FC<SelectProps> = ({ children, wrapOptions, ...props }) => {
  return (
    <AntDSelect
      {...props}
      dropdownClassName={classnames({
        "wrap-options": !!wrapOptions,
      })}
    >
      {children}
    </AntDSelect>
  );
};
export default Select;
