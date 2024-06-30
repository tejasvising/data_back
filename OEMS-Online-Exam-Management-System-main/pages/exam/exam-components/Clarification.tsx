import React, { useContext, useEffect, useState } from "react";
import Text from "../../../src/ui-custom-components/Text";
import ClarificationStyle from "./clarification.module.css";
import { Divider } from "antd";
import { imageLink } from "../../data";
import Image from "next/image";
import SingleClarification from "./SingleClarification";
import { axiosQuery, query } from "../../../lib/databaseQuery/query";
import {
  getAllowedTeacherQuery,
  getClarificationWithIdQueryString,
} from "../../../lib/graphqlQuery/graphqlQuery";
import { clarificationRefreshTime, UserContext } from "../../_app";
import InputClarificationBox from "./InputClarificationBox";

type ClarificationType = {
  id: string;
};

export type SingleClarificationType = {
  id?: string;
  text: string;
  user: {
    name: string;
    imageUrl: string;
  };
};
const fetchClarifications = async (
  id: string,
  setClarifications: (clarificatios: SingleClarificationType[]) => void
) => {
  const { data } = await axiosQuery(getClarificationWithIdQueryString(id));
  if (data?.clarification) {
    setClarifications(data?.clarification);
  }
};

const Clarification = ({ id }: ClarificationType) => {
  const { userInfo } = useContext(UserContext);
  const [adminRole, setAdminRole] = useState<boolean>(false);
  const [clarifications, setClarifications] = useState<
    SingleClarificationType[]
  >([]);

  const getAllowedTeacherEmails = async () => {
    const data = await query(getAllowedTeacherQuery(id));
    if (data?.allowed_teacher) {
      const teachers = data?.allowed_teacher;
      if (
        teachers.find(
          (user: { email?: string }) => user?.email === userInfo?.email
        )
      ) {
        setAdminRole(true);
      }
    }
  };

  useEffect(() => {
    fetchClarifications(id, setClarifications);
    if (userInfo?.email) {
      getAllowedTeacherEmails();
    }
    const timer = setInterval(async () => {
      fetchClarifications(id, setClarifications);
    }, clarificationRefreshTime);
    return () => clearInterval(timer);
  }, []);

  const myLoader = () => {
    return userInfo?.imageUrl as unknown as string;
  };

  const addNewClarification = (text: string) => {
    const newClarification: SingleClarificationType = {
      text,
      user: {
        name: userInfo?.name as unknown as string,
        imageUrl: userInfo?.imageUrl as unknown as string,
      },
    };
    setClarifications((prev) => [...prev, newClarification]);
  };
  return (
    <div className={ClarificationStyle.clarificationBox}>
      <div style={{ alignItems: "left" }}>
        <Text>{clarifications.length} Clarification</Text>
        <Divider style={{ margin: "15px 0px" }} />
        {clarifications.map((clarification) => (
          <SingleClarification key={clarification.id} {...clarification} />
        ))}
      </div>
      {adminRole && (
        <>
          <Divider />
          <div className={ClarificationStyle.commentFooter}>
            <div className={ClarificationStyle.myImage}>
              <Image
                loader={myLoader}
                src="profilePicture.png"
                alt="profilePicture"
                height="35vh"
                width="35vw"
              />
            </div>
            <InputClarificationBox
              id={id}
              addNewClarification={addNewClarification}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Clarification;
