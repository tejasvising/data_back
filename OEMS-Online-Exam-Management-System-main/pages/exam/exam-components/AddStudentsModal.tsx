import React, { useState } from "react";
import Button from "../../../src/ui-custom-components/Button";
import Text from "../../../src/ui-custom-components/Text";
import Modal from "../../../src/ui-custom-components/Modal";
import Upload from "../../../src/ui-custom-components/Upload";

//@ts-ignore
export default function AddStudentModal({ setOpen, open }) {
  const [link, setLink] = useState<string>();

  const handleSubmit = () => {
    setOpen(false);
    alert("Done");
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      visible={open}
      title="Add Students"
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
          Upload a CSV file to add students.
        </Text>
        <Upload setLink={setLink} />
      </div>
    </Modal>
  );
}
