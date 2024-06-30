import React, { useContext, useEffect, useState } from "react";
import bodystyle from "./body.module.css";

import { dashboardRefreshTime, UserContext } from "../_app";

import { getAllExamsQueryString } from "../../lib/graphqlQuery/graphqlQuery";

import RunningExamCard from "./RunningExamCard";
import ExamCard from "./ExamCard";
// import Loading from "../../src/ui-custom-components/Loading";
import { ExamTypeDate } from "../../lib/types/types";
import moment from "moment";
import { convertExamDates, parseExams } from "../utils/quickFunctions";
import { axiosQuery } from "../../lib/databaseQuery/query";

const Body = ({ examCatagory }: { examCatagory: string }) => {
  const [upcommingExam, setUpcommingExam] = useState<ExamTypeDate[]>([]);
  const [runningExam, setRunningExam] = useState<ExamTypeDate[]>([]);
  const [finishedExam, setFinishedExam] = useState<ExamTypeDate[]>([]);
  const { userInfo } = useContext(UserContext);

  const refreshExam = async () => {
    try {
      const { data } = await axiosQuery(getAllExamsQueryString());
      const exams: ExamTypeDate[] = data.exams.map(convertExamDates);
      const { upcomming, running, finished } = parseExams(exams);

      if (JSON.stringify(upcomming) != JSON.stringify(upcommingExam)) {
        setUpcommingExam(upcomming);
      }
      if (JSON.stringify(running) != JSON.stringify(runningExam)) {
        setRunningExam(running);
      }
      if (JSON.stringify(finished) != JSON.stringify(finishedExam)) {
        setFinishedExam(finished);
      }
    } catch (err) {}
  };

  useEffect(() => {
    refreshExam();
    const timer = setInterval(refreshExam, dashboardRefreshTime);
    return () => clearInterval(timer);
  }, []);

  if (examCatagory === "active") {
    return (
      <div className={bodystyle.bodyrest}>
        {runningExam.map((exam) => (
          <RunningExamCard
            key={exam.id}
            id={exam.id}
            title={exam.course.course_title}
            courseCode={exam.course.course_code}
            time={exam.end_time}
          />
        ))}
        {upcommingExam.map((exam) => {
          const time = moment(exam.start_time).format("LT");
          const date = moment(exam.start_date).format("ll");
          return (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.exam_title}
              courseCode={exam.course.course_code}
              time={`${time}, ${date}`}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={bodystyle.bodyrest}>
        {finishedExam.map((exam) => {
          const time = moment(exam.start_time).format("LT");
          const date = moment(exam.start_date).format("ll");
          return (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.exam_title}
              courseCode={exam.course.course_code}
              time={`${time}, ${date}`}
            />
          );
        })}
      </div>
    );
  }
};

export default Body;
