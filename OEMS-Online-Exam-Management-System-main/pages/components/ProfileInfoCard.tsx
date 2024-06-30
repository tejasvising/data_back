import React, { useState } from "react";
import ProfileInfoCardStyle from "./profileInfoCard.module.css";
import Text from "../../src/ui-custom-components/Text";
import Input from "../../src/ui-custom-components/InputText";
import Button from "../../src/ui-custom-components/Button";
import { useSession } from "next-auth/client";
import { axiosQuery } from "../../lib/databaseQuery/query";
import { getUpdateRollAndContactQueryString } from "../../lib/graphqlQuery/graphqlQuery";
import { off } from "process";
import Loading from "../../src/ui-custom-components/Loading";

const ProfileInfoCard = () => {
  const [session, loading] = useSession();
  const [contact, setContact] = useState<string>("");
  const [roll, setRoll] = useState<string>("");

  console.log(loading);
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
  
  const updateInfo = async () => {
    try{
      const res = await axiosQuery(
        getUpdateRollAndContactQueryString(
          session?.user?.email as string,
          contact,
          roll
        )
      );
      const {data} = res;
      if(data.update_users){
        alert("Successfully Updated!");
      }
    }catch(err){
      console.log(err);
    }
  };
  const handleSubmit = ()=>{
    if(contact!='' && roll!=''){
      updateInfo();
    }
  } 

  return session ? (
    <div className={ProfileInfoCardStyle.profileInfoCard}>
      <div style={{ marginTop: "50px" }}>
        <Text className={ProfileInfoCardStyle.textTop}>Full Name:</Text>
        <Input
          disabled
          size="large"
          className={ProfileInfoCardStyle.inputStyle}
          placeholder={session?.user?.name as string}
        ></Input>
        <Text className={ProfileInfoCardStyle.textTop}>E-mail:</Text>
        <Input
          disabled
          size="large"
          className={ProfileInfoCardStyle.inputStyle}
          placeholder={session?.user?.email as string}
        ></Input>
        <Text className={ProfileInfoCardStyle.textTop}>Username:</Text>
        <Input
          required
          size="large"
          className={ProfileInfoCardStyle.inputStyle}
          placeholder="Use Your Registration Number"
          onChange={(e)=>setRoll(e.target.value)}
        ></Input>
        <Text className={ProfileInfoCardStyle.textTop}>Contact Number:</Text>
        <Input
          size="large"
          className={ProfileInfoCardStyle.inputStyle}
          placeholder="Enter Your Contact Number"
          onChange={(e)=>setContact(e.target.value)}
        ></Input>
      </div>
      <Button theme="dark" style={{ maxWidth: "30%", marginTop: "5px" }} onClick={handleSubmit} >
        Save
      </Button>
    </div>
  ) : (
    <></>
  );
};

export default ProfileInfoCard;
