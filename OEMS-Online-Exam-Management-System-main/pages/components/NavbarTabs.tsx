import React, { useContext } from "react";
import { Tabs } from "antd";
import TabsStyle from "./examTabs.module.css";
import Button from "../../src/ui-custom-components/Button";
import { ExamCatagoryContext } from "../home";

const { TabPane } = Tabs;

const NavbarTabs = () => {
  const { setExamCatagory } = useContext(ExamCatagoryContext);
  const handleChange = (key: string) => {
    //@ts-ignore
    setExamCatagory(key);
  };
  return (
    <Tabs centered size="large" onChange={handleChange}>
      <TabPane tab="Active" key="active"></TabPane>
      <TabPane tab="Finished" key="finished"></TabPane>
    </Tabs>
  );
};

export default NavbarTabs;
