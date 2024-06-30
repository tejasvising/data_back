import React from "react";
import Text from "../../../src/ui-custom-components/Text";
import RequestStyle from "./requests.module.css";
import { Divider } from "antd";
import InputCommentBox from "./InputComment";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleRequest from "./SingleRequest";

const Requests = () => {
  const myLoader = () => {
    return imageLink;
  };
  return (
    <div className={RequestStyle.requests}>
      <div style={{ alignItems: "left" }}>
        <Text>2 Requests</Text>
        <Divider style={{ margin: "15px 0px" }} />
        <SingleRequest />
        <SingleRequest />
      </div>
      <Divider />
    </div>
  );
};

export default Requests;
