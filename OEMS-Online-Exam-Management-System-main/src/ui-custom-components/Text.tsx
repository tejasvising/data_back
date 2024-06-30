import React from "react";
import { Typography } from "antd";

const TypoText = Typography.Text;
type TextProps = React.ComponentProps<typeof Typography>;

const Text = (props: TextProps) => {
  return <TypoText {...props}></TypoText>;
};

export default Text;
