import { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import CreateExamModal from "./CreateExamModal";
import { PlusCircleOutlined } from "@ant-design/icons";
import PermissionModal from "./PermissionModal";
import Dropdown, { ItemType } from "../../src/ui-custom-components/Dropdown";
import navstyle from "./navbar.module.css";
import { logOut } from "../utils/authentication";
import { useRouter } from "next/router";
import EnterExamModal from "./EnterExamModal";

const NavbarRightComponenet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [session, loading] = useSession();
  const [openPermission, setOpenPermission] = useState<boolean>(false);
  const ref = useRef(null);

  const handleClick = () => {
    setOpen((value) => !value);
  };

  const handleClickPermission = () => {
    setOpenPermission((value) => !value);
  };

  const router = useRouter();
  const handleClickProfile = () => {
    router.push(`/Profile`);
  };

  const myLoader = () => {
    return session?.image;
  };
  const dropDownItems: ItemType[] = [
    {
      key: "profile",
      onClick: handleClickProfile,
      children: "Profile",
    },
    {
      key: "permission",
      onClick: handleClickPermission,
      children: "Permission",
    },
    {
      key: "logout",
      //@ts-ignore
      onClick: logOut,
      children: "Logout",
    },
  ];

  return session ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        justifyContent: "flex-end",
        marginRight: "10px",
      }}
    >
      {session?.adminRole ? (
        <div>
          <CreateExamModal open={open} setOpen={setOpen} />
          <PlusCircleOutlined
            style={{ fontSize: "24px", color: "#1890ff", marginLeft: "15px" }}
            onClick={handleClick}
          />
        </div>
      ) : (
        <div>
          <EnterExamModal open={open} setOpen={setOpen} />
          <PlusCircleOutlined
            style={{ fontSize: "24px", color: "#1890ff", marginLeft: "15px" }}
            onClick={handleClick}
          />
        </div>
      )}
      <div ref={ref}>
        <PermissionModal open={openPermission} setOpen={setOpenPermission} />
        {/* @ts-ignore */}
        <Dropdown
          getPopupContainer={() => ref.current}
          overlay={<></>}
          items={dropDownItems}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <div className={navstyle.myImage}>
              <Image
                //@ts-ignore
                loader={myLoader}
                src="profilePicture.png"
                alt="profilePicture"
                height="45vh"
                width="45vw"
              />
            </div>
          </a>
        </Dropdown>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default NavbarRightComponenet;
