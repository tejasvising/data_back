import React from "react";
import Text from "../../../src/ui-custom-components/Text";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleRequestStyle from "./requests.module.css";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Button from "../../../src/ui-custom-components/Button";

const SingleRequest = () => {
  const myLoader = () => {
    return imageLink;
  };
  return (
    <div
      className={SingleRequestStyle.singleRequest}
      style={{ justifyContent: "space-between" }}
    >
      <div className={SingleRequestStyle.singleRequest}>
        <div className={SingleRequestStyle.myImage}>
          <Image
            loader={myLoader}
            src="profilePicture.png"
            alt="profilePicture"
            height="35vh"
            width="35vw"
          />
        </div>
        <div>
          <Text>
            <strong> Quamrul Islam </strong>
          </Text>
          <br />
          <Text>2017331081</Text>
          <br />
        </div>
      </div>
      <div
        className={SingleRequestStyle.singleRequest}
        style={{ marginRight: "15px" }}
      >
        <Button theme="transparent">
          <CheckOutlined style={{ color: "green", fontSize: "20px" }} />
        </Button>
        <Button theme="transparent">
          <CloseOutlined style={{ color: "red", fontSize: "20px" }} />
        </Button>
      </div>
    </div>
  );
};

export default SingleRequest;
