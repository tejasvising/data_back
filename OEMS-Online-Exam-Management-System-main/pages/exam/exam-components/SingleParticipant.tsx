import React from "react";
import Text from "../../../src/ui-custom-components/Text";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleParticipantStyle from "./participants.module.css";
import { TeacherType } from "./Participants";


const SingleParticipants = ({name, imageUrl}: TeacherType) => {
  const myLoader = () => {
    return imageUrl;
  };
  return (
    <div className={SingleParticipantStyle.singleParticipant}>
      <div className={SingleParticipantStyle.myImage}>
        <Image
          loader={myLoader}
          src="profilePicture.png"
          alt="profilePicture"
          height="35vh"
          width="35vw"
        />
      </div>
      <Text>{name}</Text>
      <br />
    </div>
  );
};

export default SingleParticipants;
