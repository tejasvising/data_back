import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { storageRef } from "../../public/firebase/initFirebase";
import Button from "./Button";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadScript = ({ setLink }: { setLink: (value: string) => void }) => {
  const props = {
    name: "file",
    multiple: false,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file: any, fileList: any) {
      const fileRef = ref(storageRef, file.name);
      uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(fileRef).then((url) => setLink(url));
        console.log({ snapshot });
      });
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Upload {...props}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button icon={<UploadOutlined />} theme="upload">
          Click to upload part A
        </Button>
        <Button icon={<UploadOutlined />} theme="upload">
          Click to upload part B
        </Button>
      </div>
    </Upload>
  );
};

export default UploadScript;
