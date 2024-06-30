import React, { useState } from "react";
import Button from "../../../src/ui-custom-components/Button";
import Modal from "../../../src/ui-custom-components/Modal";
import CheckBox from "./CheckBox";
import Link from "../../../src/ui-custom-components/Link";

//@ts-ignore
export default function DownloadScriptModal({ setOpen, open }) {
  const [link, setLink] = useState<string>();

  const handleSubmit = () => {
    // setOpen(false);
    setLink("https://firebasestorage.googleapis.com/v0/b/sust-oems.appspot.com/o/question-40Code.cpp?alt=media&token=56e0e643-eda7-44eb-a576-300eb9cb9388")
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      visible={open}
      title="Download Answer Scripts"
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
          Create PDF
        </Button>,
      ]}
    >
      <CheckBox />
      {link && (
        <Link
          style={{ fontSize: "18px", marginTop: "5px" }}
          href={link}
          target="_blank"
        >
          Here is your script!
        </Link>
      )}
    </Modal>
  );
}
