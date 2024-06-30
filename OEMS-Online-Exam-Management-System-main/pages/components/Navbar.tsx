import React, { useState } from "react";
import navstyle from "./navbar.module.css";
import NavbarTabs from "./NavbarTabs";
import { Row, Col } from "antd";

import NavbarLeftComponenet from "./NavbarLeftComponenet";
import NavbarRightComponenet from "./NavbarRightComponent";

const Navbar = ({ showTabs = true }: { showTabs?: boolean }) => {
  return (
    <div className={navstyle.navbar}>
      {showTabs ? (
        <Row justify="center" align="middle">
          <Col span={10}>
            <NavbarLeftComponenet />
          </Col>
          <Col span={4}>
            <NavbarTabs />
          </Col>
          <Col span={10}>
            <NavbarRightComponenet />
          </Col>
        </Row>
      ) : (
        <Row justify="center" align="middle">
          <Col span={12}>
            <NavbarLeftComponenet />
          </Col>
          <Col span={12}>
            <NavbarRightComponenet />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Navbar;
