import React from "react";
import ExamBodyStyle from "./examBody.module.css";
import ExamTabs from "./ExamTabs";
import ExamHeaderCard from "./ExamHeaderCard";
import { useQuery } from "@apollo/client";
import { getExamByIdQuery } from "../../../lib/graphqlQuery/graphqlQuery";
import Loading from "../../../src/ui-custom-components/Loading";
import { convertExamDates } from "../../utils/quickFunctions";
import { ExamTypeDate } from "../../../lib/types/types";

const ExamBody = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getExamByIdQuery(id));
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
  if (data) {
    const exams: ExamTypeDate[] = data.exams.map(convertExamDates);
    if (!exams.length) {
      return <h1>Wrong URL</h1>;
    }

    const exam = exams[0];
    let status = "Running Exam";
    if (new Date() < exam.start_time) {
      status = "Upcoming Exam";
    } else if (exam.end_time < new Date()) {
      status = "Finished Exam";
    }
    return (
      <div className={ExamBodyStyle.examBody}>
        <ExamHeaderCard
          status={status}
          title={exam.course.course_title}
          courseCode={exam.course.course_code}
          time={exam.end_time}
          id={id}
        />
        {/* @ts-ignore */}
        <ExamTabs exam={exam} status={status} />
      </div>
    );
  }
  if (error) {
    return <h1>Something went wrong!</h1>;
  }
};

export default ExamBody;
