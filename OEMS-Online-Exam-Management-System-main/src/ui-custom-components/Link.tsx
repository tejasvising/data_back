import React from "react";
import { Typography } from "antd";

const TypoLink = Typography.Link;
type LinkPropsType = React.ComponentProps<typeof TypoLink>;

const Link = ({ children, ...props }: LinkPropsType) => {
  return <TypoLink {...props}> {children} </TypoLink>;
};

export default Link;
