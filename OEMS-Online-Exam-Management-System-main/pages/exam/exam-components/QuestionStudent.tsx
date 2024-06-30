import React, { useState } from "react";
import Text from "../../../src/ui-custom-components/Text";
import Link from "../../../src/ui-custom-components/Link";
import Button from "../../../src/ui-custom-components/Button";
import QuestionStyle from "./question.module.css";
import UploadScript from "../../../src/ui-custom-components/UploadScript";

type QuestionStudentProps = {
  status: string;
};
const QuestionStudent = ({ status }: QuestionStudentProps) => {
  const [link, setLink] = useState<string>();
  if (status === "Upcoming Exam") {
    return (
      <div className={QuestionStyle.question}>
        <Text style={{ fontSize: "18px", marginBottom: "10px" }}>
          Stay tuned. The exam will be held soon.
        </Text>
      </div>
    );
  } else if (status === "Running Exam") {
    return (
      <div className={QuestionStyle.question}>
        <UploadScript setLink={setLink} />
        <Button theme="dark" style={{ marginTop: "10px" }}>
          Upload Script
        </Button>
      </div>
    );
  } else {
    return (
      <div className={QuestionStyle.question}>
        <Text style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thanks for your participation.
        </Text>
        {link && (
          <Link style={{ fontSize: "18px" }} href={link} target="_blank">
            Question link.
          </Link>
        )}
      </div>
    );
  }
};

export default QuestionStudent;
