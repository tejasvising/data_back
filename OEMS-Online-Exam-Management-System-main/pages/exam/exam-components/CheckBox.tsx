import React, { useState } from "react";
import { Checkbox as AntDCheckbox, Divider } from "antd";

const AntDCheckboxGroup = AntDCheckbox.Group;

const plainOptions = [
  "2017331022",
  "2017331063",
  "2017331081",
  "2017331021",
  "2017331017",
  "2017331022",
  "2017331063",
  "2017331081",
  "2017331021",
  "2017331017",
  "2017331022",
  "2017331063",
  "2017331081",
  "2017331021",
  "2017331017",
]; //@ts-ignore
const defaultCheckedList = [];

const CheckBox = () => {
  //@ts-ignore
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <AntDCheckbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Mark all
      </AntDCheckbox>
      <Divider />
      <AntDCheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};

export default CheckBox;
