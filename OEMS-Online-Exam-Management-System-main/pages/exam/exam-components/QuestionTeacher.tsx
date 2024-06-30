import React, { useEffect, useState } from "react";
import Upload from "../../../src/ui-custom-components/Upload";
import Link from "../../../src/ui-custom-components/Link";
import Button from "../../../src/ui-custom-components/Button";
import QuestionStyle from "./question.module.css";
import DownloadScriptModal from "./DownloadScriptModal";
import {
  getQuestionsWithIdQueryString,
  getUpsertQuestionQueryString,
} from "../../../lib/graphqlQuery/graphqlQuery";
import { axiosQuery } from "../../../lib/databaseQuery/query";

type QuestionTeacherProps = {
  status: string;
  id: string;
};

const loadQuestionLink = async (
  id: string,
  setLink: (link: string[]) => void
) => {
  const { data } = await axiosQuery(getQuestionsWithIdQueryString(id));
  if (data?.questions) {
    const questions = data.questions.map((element: any) => element.link);
    setLink(questions);
  }
};

const QuestionTeacher = ({ status, id }: QuestionTeacherProps) => {
  const [links, setLinks] = useState<string[]>([]);
  const [openDownloadScript, setOpenDownloadScript] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<string>();
  const handleChange = () => {
    setOpenDownloadScript((value) => !value);
  };

  useEffect(() => {
    loadQuestionLink(id, setLinks);
  }, []);

  const uploadQuestion = async () =>{
    const link = uploadFile;
    if(link){
      const { data } = await axiosQuery(getUpsertQuestionQueryString(link, id));
      if (data) {
        loadQuestionLink(id, setLinks);
        setUploadFile(undefined);
      }
    }
  }

  if (status === "Upcoming Exam") {
    return (
      <div className={QuestionStyle.question}>
        {links.map((link: string, index: number) => {
          return (
            <Link
              key={index}
              style={{ fontSize: "18px" }}
              href={link}
              target="_blank"
            >
              {`${index+1}) `}Question link.
            </Link>
          );
        })}
        <Upload exam_id={id} setLink={setUploadFile} prefix={`question-${id}`} />
        <Button theme="dark" style={{ marginTop: "10px" }} onClick={uploadQuestion}>
          Upload
        </Button>
      </div>
    );
  } else if (status === "Running Exam") {
    return (
      <div className={QuestionStyle.question}>
        {links.map((link: string, index) => (
          <Link
            key={index}
            style={{ fontSize: "18px" }}
            href={link}
            target="_blank"
          >
            {`${index+1}) `}Question link.
          </Link>
        ))}
      </div>
    );
  } else {
    return (
      <div className={QuestionStyle.question}>
        {links.map((link: string, index) => (
          <Link
            key={index}
            style={{ fontSize: "18px" }}
            href={link}
            target="_blank"
          >
            {`${index+1}) `}Question link.
          </Link>
        ))}
        <Button
          theme="dark"
          style={{ marginTop: "10px" }}
          onClick={handleChange}
        >
          Download Scripts
        </Button>
        <DownloadScriptModal
          open={openDownloadScript}
          setOpen={setOpenDownloadScript}
        />
      </div>
    );
  }
};

export default QuestionTeacher;
