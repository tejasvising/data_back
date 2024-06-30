import React from "react";
import ProfileBodyStyle from "./profileBody.module.css";
import { useSession } from "next-auth/client";
import Image from "next/image";
import ProfileInfoCard from "./ProfileInfoCard";

const ProfileBody = () => {
  const [session, loading] = useSession();
  const myLoader = () => {
    return session?.image;
  };
  return session ? (
    <div className={ProfileBodyStyle.profileBody}>
      <div className={ProfileBodyStyle.profileHeader}></div>
      <div className={ProfileBodyStyle.myImage}>
        <Image
          //@ts-ignore
          loader={myLoader}
          src="profilePicture.png"
          alt="profilePicture"
          height="120vh"
          width="120vw"
        />
      </div>
      <ProfileInfoCard />
    </div>
  ) : (
    <></>
  );
};

export default ProfileBody;
