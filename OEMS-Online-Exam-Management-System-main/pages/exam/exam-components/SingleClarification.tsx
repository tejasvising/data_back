import React from "react";
import Text from "../../../src/ui-custom-components/Text";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleClarificationStyle from "./clarification.module.css";
import { SingleClarificationType } from "./Clarification";

const SingleClarification = (props: SingleClarificationType) => {
  const { text, user } = props;
  const { name, imageUrl } = user;
  const myLoader = () => {
    return imageUrl;
  };
  return (
    <div className={SingleClarificationStyle.singleClarification}>
      <div className={SingleClarificationStyle.myImage}>
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
          <strong> {name} </strong>
        </Text>
        <br />
        <Text>{text}</Text>
        <br />
      </div>
    </div>
  );
};

export default SingleClarification;
