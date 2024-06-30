import React, { useEffect, useState } from "react";
import cardstyle from "./examHeaderCard.module.css";
import Text from "../../../src/ui-custom-components/Text";

type RunningExamCardProps = {
  status: string;
  title: string;
  time: Date; // Time
  courseCode: string;
  onClick?: () => void;
  id: string;
};

const ExamHeaderCard = ({
  status,
  title,
  time,
  courseCode,
  onClick,
  id,
}: RunningExamCardProps) => {
  const [remaingTime, setRemainingTime] = useState<number>(
    Math.floor((time.getTime() - new Date().getTime()) / 1000)
  );

  useEffect(() => {
    let timer: any = null;
    if (remaingTime > 0) {
      timer = setInterval(
        () => setRemainingTime((time) => Math.max(0, time - 1)),
        1000
      );
    } else {
      setRemainingTime(0);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  const hour = Math.floor(remaingTime / 3600)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((remaingTime / 60) % 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor(remaingTime % 60)
    .toString()
    .padStart(2, "0");
  const countdown = `${hour}:${minute}:${second}`;

  return (
    <div className={cardstyle.examHeaderCard}>
      <Text style={{ marginTop: "10px", fontSize: "16px", color: "white" }}>
        {status} : {courseCode}
      </Text>
      <Text style={{ margin: "-5px", fontSize: "24px", color: "white" }}>
        <strong> {title} </strong>
      </Text>
      {status !== "Upcoming Exam" && (
        <Text style={{ marginBottom: "0px", fontSize: "16px", color: "white" }}>
          {countdown}
        </Text>
      )}
      <Text style={{ fontSize: "16px", marginBottom: "10px", color: "white" }}>
        Exam Code: {id}
      </Text>
    </div>
  );
};

export default ExamHeaderCard;
