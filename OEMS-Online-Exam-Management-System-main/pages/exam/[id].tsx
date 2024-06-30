import React from "react";
import Navbar from "../components/Navbar";
import ExamBody from "./exam-components/ExamBody";
import { useRouter } from 'next/router'

const Id = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div>
      <Navbar showTabs={false}/>
      {/* @ts-ignore */}
      <ExamBody id={id as string}/>
    </div>
  );
};

export default Id;
