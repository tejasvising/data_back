import React from "react";
import Text from "../../../src/ui-custom-components/Text";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleCommentStyle from "./discussion.module.css";
import { DiscussionType } from "../../../lib/types/types";

const SingleComment = ({ discussion }: { discussion: DiscussionType }) => {
  
  const myLoader = () => {
    return discussion.user.imageUrl;
  };
  return (
    <div className={SingleCommentStyle.singleComment}>
      <div className={SingleCommentStyle.myImage}>
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
          <strong> {discussion?.user?.name} </strong>
        </Text>
        <br />
        <Text>{discussion.comment}</Text>
        <br />
      </div>
    </div>
  );
};

export default SingleComment;
