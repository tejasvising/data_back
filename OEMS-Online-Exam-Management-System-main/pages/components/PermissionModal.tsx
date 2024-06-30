import React from "react";
import Button from "../../src/ui-custom-components/Button";
import Input from "../../src/ui-custom-components/InputText";
import Modal from "../../src/ui-custom-components/Modal";

import PermissionModalStyle from "./permissionModal.module.css";

//@ts-ignore
export default function PermissionModal({ setOpen, open }) {
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
      title="Permission for Teacher Role"
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
          Claim
        </Button>,
      ]}
    >
      <Input
        size="large"
        className={PermissionModalStyle.inputStyle}
        placeholder="Enter email"
      ></Input>
      <Input
        size="large"
        className={PermissionModalStyle.inputStyle}
        placeholder="Enter code"
      ></Input>
    </Modal>
  );
}
