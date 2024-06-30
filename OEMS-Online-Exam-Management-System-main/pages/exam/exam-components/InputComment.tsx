import React, { useContext, useState } from "react";
import Input from "../../../src/ui-custom-components/InputText";
import Button from "../../../src/ui-custom-components/Button";
import { SendOutlined } from "@ant-design/icons";
import { UserContext } from "../../_app";
import { axiosQuery } from "../../../lib/databaseQuery/query";
import { getUpsertCommentQueryString } from "../../../lib/graphqlQuery/graphqlQuery";

const updateComment = async (
  exam_id: string,
  email: string,
  comment: string,
  addNewComment: (comment: string) => void,
  setComment: (comment: string) => void
) => {
  const res = await axiosQuery(
    getUpsertCommentQueryString(exam_id, email, comment)
  );

  if (res?.data?.insert_discussions_one) {
    addNewComment(comment);
    setComment("");
  }
};

const InputCommentBox = ({
  id,
  addNewComment,
}: {
  id: string;
  addNewComment: (comment: string) => void;
}) => {
  const [comment, setComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    updateComment(
      id,
      userInfo?.email as unknown as string,
      comment,
      addNewComment,
      setComment
    );
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <Input
      suffix={
        <Button theme="transparent" onClick={handleClick}>
          <SendOutlined />
        </Button>
      }
      style={{ borderRadius: "20px" }}
      onChange={handleChange}
      onKeyPress={onKeyPress}
      value={comment}
    />
  );
};

export default InputCommentBox;
