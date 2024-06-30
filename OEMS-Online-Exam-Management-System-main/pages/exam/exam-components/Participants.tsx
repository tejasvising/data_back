import React, { useState } from "react";
import Text from "../../../src/ui-custom-components/Text";
import ParticipantsStyle from "./participants.module.css";
import { Divider } from "antd";
import SingleParticipant from "./SingleParticipant";
import Button from "../../../src/ui-custom-components/Button";
import AddStudentsModal from "./AddStudentsModal";
import AddTeachersModal from "./AddTeachersModal";
import { useQuery } from "@apollo/client";
import { getAllowedTeacherQuery } from "../../../lib/graphqlQuery/graphqlQuery";
import Loading from "react-loading";

type ParticipantsProps = {
  id: string;
};

export type TeacherType = {
  name: string;
  email: string;
  imageUrl: string;
};

const Participants = ({ id }: ParticipantsProps) => {
  const [openStudents, setOpenStudents] = useState<boolean>(false);
  const [openTeachers, setOpenTeachers] = useState<boolean>(false);

  const { data, loading, error } = useQuery(getAllowedTeacherQuery(id));

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Loading />
      </div>
    );
  }

  const handleClickStudents = () => {
    setOpenStudents((value) => !value);
  };
  const handleClickTeachers = () => {
    setOpenTeachers((value) => !value);
  };

  if (data) {
    const { allowed_teacher } = data;
    let teachers: TeacherType[] = [];
    if (allowed_teacher) {
      teachers = allowed_teacher.map((element: any) => ({
        email: element.email,
        name: element.user.name,
        imageUrl: element.user.imageUrl
      }));
    }

    return (
      <div className={ParticipantsStyle.participationBox}>
        <div style={{ alignItems: "left" }}>
          <div className={ParticipantsStyle.semiHeader}>
            <Text style={{ fontSize: "18px" }}>Teachers</Text>
            <Button theme="dark" onClick={handleClickTeachers}>
              Add Teachers
            </Button>
            <AddTeachersModal open={openTeachers} setOpen={setOpenTeachers} />
          </div>
          <Divider style={{ margin: "15px 0px" }} />
          {
            teachers.map((teacher,index)=><SingleParticipant key={index} {...teacher}/>)
          }
        </div>
        <Divider />
        <div style={{ alignItems: "left" }}>
          <div className={ParticipantsStyle.semiHeader}>
            <Text style={{ fontSize: "18px" }}>Students</Text>
            <Button theme="dark" onClick={handleClickStudents}>
              Add Students
            </Button>
            <AddStudentsModal open={openStudents} setOpen={setOpenStudents} />
          </div>
          <Divider style={{ margin: "15px 0px" }} />
          {/* <SingleParticipant />
          <SingleParticipant />
          <SingleParticipant />
          <SingleParticipant /> */}
        </div>
      </div>
    );
  }
};

export default Participants;
