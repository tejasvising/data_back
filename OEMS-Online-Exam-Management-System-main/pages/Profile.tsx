import React from "react";
import Navbar from "./components/Navbar";
import ProfileBody from "./components/ProfileBody";
import ProfileStyle from "./components/profileBody.module.css";

const Profile = () => {
  return (
    <div className={ProfileStyle.profile}>
      <Navbar showTabs={false} />
      <ProfileBody />
    </div>
  );
};

export default Profile;
