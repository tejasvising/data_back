import React from "react";
import cardstyle from "./examCard.module.css";
import Text from "../../src/ui-custom-components/Text";
import { useRouter } from "next/router";

type ExamCardProps = {
  id: string;
  title: string;
  time: string; // Time and Date
  courseCode: string;
};

const ExamCard = ({ id, title, time, courseCode }: ExamCardProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/exam/${id}`);
  }
  return (
    <div className={cardstyle.cardNormal} onClick={handleClick}>
      <div style={{ margin: "15px 45px", fontSize: "16px" }}>
        <Text>
          <strong>{`${courseCode}: ${title}`}</strong>
        </Text>
      </div>
      <div style={{ margin: "15px 45px", minWidth: "20%", textAlign: "right" }}>
        <Text>{time}</Text>
      </div>
    </div>
  );
};

export default ExamCard;
