import React from "react";
import { Typography } from "antd";

const TypoTitle = Typography.Title;
type TitleProps = React.ComponentProps<typeof TypoTitle>;

const Title = (props: TitleProps) => {
  return <TypoTitle {...props}></TypoTitle>;
};

export default Title;
