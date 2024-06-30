import Image from "next/image";
import Title from "../../src/ui-custom-components/Title";
import navlogo from "../../public/image/sustlogo.png";
import Link from "../../src/ui-custom-components/Link";

const NavbarLeftComponenet = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ padding: "10px", marginLeft: "10px" }}>
        <Image src={navlogo} alt="sustlogo" height="55vh" width="50vw" />
      </div>
      <div style={{ padding: "10px" }}>
        <Link href='/home'>
          <Title level={5} style={{ marginBottom: "-5px", fontSize: "16.25px" }}>
            <strong>Shahjalal University of Science & Technology</strong>
          </Title>
        </Link>
        <Link href='/home'>
          <Title level={4} style={{ margin: "unset", fontSize: "21px" }}>
            <strong>Online Exam Management System</strong>
          </Title>
        </Link>
      </div>
    </div>
  );
};
export default NavbarLeftComponenet;
