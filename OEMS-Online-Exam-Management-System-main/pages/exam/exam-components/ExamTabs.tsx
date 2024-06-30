import React, { useContext, useState } from "react";
import { Tabs } from "antd";
import TabsStyle from "./examTabs.module.css";
import Discussion from "./Discussion";
import Clarification from "./Clarification";
import QuestionTeacher from "./QuestionTeacher";
import Participants from "./Participants";
import QuestionStudent from "./QuestionStudent";
import Requests from "./Requests";
import { ExamTypeDate } from "../../../lib/types/types";
import Loading from "../../../src/ui-custom-components/Loading";
import { getAllowedTeacherQuery } from "../../../lib/graphqlQuery/graphqlQuery";
import { useQuery } from "@apollo/client";
import { UserContext } from "../../_app";

const { TabPane } = Tabs;

type ExamTabsProps = {
  exam: ExamTypeDate;
  status: string;
};

const ExamTabs = ({ exam, status }: ExamTabsProps) => {
  let adminRole: boolean = false;
  const {data, loading, error} = useQuery(getAllowedTeacherQuery(exam.id));
  const { userInfo } = useContext(UserContext);

  if(data){
    const teachers = data.allowed_teacher;
    if(teachers.find((element: any)=>element?.email==userInfo?.email)){
      adminRole = true;
    }
    if (adminRole) {
      return (
        <div className={TabsStyle.tabs}>
          <Tabs centered size="large">
            <TabPane tab="Question" key="question">
              <QuestionTeacher id={exam.id} status={status} />
            </TabPane>
            <TabPane tab="Discussion" key="discussion">
              <Discussion id={exam.id}/>
            </TabPane>
            <TabPane tab="Clarifications" key="clarifications">
              <Clarification id={exam.id}/>
            </TabPane>
            <TabPane tab="Participants" key="participants">
              <Participants id={exam.id}/>
            </TabPane>
            <TabPane tab="Requests" key="requests">
              <Requests />
            </TabPane>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div className={TabsStyle.tabs}>
          <Tabs centered size="large">
            <TabPane tab="Question" key="question">
              <QuestionStudent status={status} />
            </TabPane>
            <TabPane tab="Discussion" key="discussion">
              <Discussion id={exam.id}/>
            </TabPane>
            <TabPane tab="Clarifications" key="clarifications">
              <Clarification id={exam.id}/>
            </TabPane>
          </Tabs>
        </div>
      );
    }
    
  }

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

};

export default ExamTabs;