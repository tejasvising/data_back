import React, { useContext, useState } from "react";
import Input from "../../../src/ui-custom-components/InputText";
import Button from "../../../src/ui-custom-components/Button";
import { SendOutlined } from "@ant-design/icons";
import { UserContext } from "../../_app";
import { axiosQuery } from "../../../lib/databaseQuery/query";
import { getUpsertClarificationQueryString } from "../../../lib/graphqlQuery/graphqlQuery";

const updateComment = async (
  exam_id: string,
  email: string,
  text: string,
  addNewClarification: (text: string) => void,
  setComment: (text: string) => void
) => {
  const res = await axiosQuery(
    getUpsertClarificationQueryString(exam_id, email, text)
  );

  if (res?.data?.insert_clarification_one) {
    addNewClarification(text);
    setComment("");
  }
};

const InputClarificationBox = ({
  id,
  addNewClarification,
}: {
  id: string;
  addNewClarification: (text: string) => void;
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
      addNewClarification,
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

export default InputClarificationBox;
