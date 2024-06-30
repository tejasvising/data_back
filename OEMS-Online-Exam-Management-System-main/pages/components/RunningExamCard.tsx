import React, { useEffect, useState } from "react";
import cardstyle from "./runningExamCard.module.css";
import Button from "../../src/ui-custom-components/Button";
import Text from "../../src/ui-custom-components/Text";
import { useRouter } from "next/router";

type RunningExamCardProps = {
  id: string;
  title: string;
  time: Date; // Time
  courseCode: string;
};

const ExamCard = ({
  id,
  title,
  time,
  courseCode,
}: RunningExamCardProps) => {
  const [remaingTime, setRemainingTime] = useState<number>(
    Math.floor((time.getTime() - new Date().getTime()) / 1000)
  );
  const router = useRouter()
  const handleClick = () => {
    router.push(`/exam/${id}`);
  }

  useEffect(() => {
    const timer = setInterval(() => setRemainingTime((time) => time - 1), 1000);
    return () => clearInterval(timer);
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

  return (
    <div className={cardstyle.cardRunning}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "15px 45px",
        }}
      >
        <Text
          style={{ marginBottom: "unset", fontSize: "16px", color: "white" }}
        >
          Running Exam: {courseCode}
        </Text>
        <Text
          style={{ marginBottom: "unset", fontSize: "24px", color: "white" }}
        >
          <strong> {title} </strong>
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "15px 45px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: "16px", color: "white", padding: "10px" }}>
          {`${hour}:${minute}:${second}`}
        </Text>
        <Button style={{ marginBottom: "15px" }} theme="transparentOutlined" onClick={handleClick}>
          Participate Now
        </Button>
      </div>
    </div>
  );
};

export default ExamCard;
