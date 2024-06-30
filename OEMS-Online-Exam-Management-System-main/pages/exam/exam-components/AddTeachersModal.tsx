import React, { useState } from "react";
import Button from "../../../src/ui-custom-components/Button";
import Text from "../../../src/ui-custom-components/Text";
import Modal from "../../../src/ui-custom-components/Modal";
import Select from "../../../src/ui-custom-components/Select";
import Option from "../../../src/ui-custom-components/Option";
import { useQuery } from "@apollo/client";
import { getAllTeacherQuery } from "../../../lib/graphqlQuery/graphqlQuery";
import Loading from "../../../src/ui-custom-components/Loading";

export default function AddTeachersModal({ setOpen, open }: {open: boolean, setOpen: any}) {

  const {data, loading, error} = useQuery(getAllTeacherQuery());
  const [selectedEmail, setSelectedEmail] = useState([]);
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


  const handleSubmit = () => {
    setOpen(false);
    alert("Done");
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  let children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value={i.toString(36) + i}>
        {i.toString(36) + i}
      </Option>
    );
  }

  if(data){
    const {users} = data;

    children = users.map((user: any, index: number) => <Option key={index} value={user?.email}>{user?.name}</Option> )
    
  }

  return (
    <Modal
      visible={open}
      title="Add Teachers"
      onCancel={handleClickClose}
      footer={[
        <Button key="cancelButton" theme="dark" onClick={handleClickClose}>
          Cancel
        </Button>,
        <Button
          key="submitButton"
          theme="dark"
          onClick={handleSubmit}
          style={{ marginRight: "7px", marginLeft: "10px" }}
        >
          Done
        </Button>,
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Select a single or multiple teachers to add to this exam.
        </Text>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select Teachers"
          onChange={handleChange}
        >
          {children}
        </Select>
      </div>
    </Modal>
  );
}
