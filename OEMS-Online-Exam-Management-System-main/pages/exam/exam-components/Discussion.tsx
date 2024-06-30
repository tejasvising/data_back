import React, { useEffect, useState } from "react";
import Text from "../../../src/ui-custom-components/Text";
import DiscussionStyle from "./discussion.module.css";
import { Divider } from "antd";
import InputCommentBox from "./InputComment";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleComment from "./SingleComment";
import { useSession } from "next-auth/client";
import { DiscussionType } from "../../../lib/types/types";
import { axiosQuery } from "../../../lib/databaseQuery/query";
import { discussionRefreshTime } from "../../_app";
import { getDiscussionByIdQueryString } from "../../../lib/graphqlQuery/graphqlQuery";

type DiscussionProps = {
  id: string;
};

const fetchDiscussion = async (
  id: string,
  setDiscussions: (discussions: DiscussionType[]) => void
) => {
  try {
    const { data } = await axiosQuery(getDiscussionByIdQueryString(id));
    setDiscussions(data.discussions);
  } catch (err) {}
};

const Discussion = ({ id }: DiscussionProps) => {
  const [session, loading] = useSession();
  const [discussions, setDiscussions] = useState<DiscussionType[]>([]);

  useEffect(() => {
    fetchDiscussion(id, setDiscussions);
    const timer = setInterval(async () => {
      fetchDiscussion(id, setDiscussions);
    }, discussionRefreshTime);
    return () => clearInterval(timer);
  }, []);

  const myLoader = () => {
    return session?.user?.image as string;
  };

  const addNewComment = (comment: string) => {
    if (session?.user) {
      const newComment: DiscussionType = {
        comment,
        exam_id: id,
        email: session?.user?.email as string,
        user: {
          name: session?.user?.name as string,
          imageUrl: session?.user?.image as string,
        },
      };
      setDiscussions((prev) => [...prev, newComment]);
    }
  };

  return (
    <div className={DiscussionStyle.discussion}>
      <div style={{ alignItems: "left" }}>
        <Text>{discussions.length} Comments</Text>
        <Divider style={{ margin: "15px 0px" }} />
        {discussions.map((discussion, index) => (
          <SingleComment key={index} discussion={discussion} />
        ))}
      </div>
      <Divider />
      {session?.user && (
        <div className={DiscussionStyle.commentFooter}>
          <div className={DiscussionStyle.myImage}>
            <Image
              loader={myLoader}
              src="profilePicture.png"
              alt="profilePicture"
              height="35vh"
              width="35vw"
            />
          </div>
          <InputCommentBox id={id} addNewComment={addNewComment} />
        </div>
      )}
    </div>
  );
};

export default Discussion;
