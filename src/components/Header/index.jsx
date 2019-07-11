import React from "react";
import "./style.sass";
import { Row, Col } from "antd";

const Header = () => (
<div className="header-container">
  <Row type="flex" justify="space-between" align="middle">
      <Col>
          <img src={require("../../assets/img/monggopesen_logo_white.png")} alt="monggopesen logo" />
      </Col>
      <Col>
        <div className="container-header-menu">
          <span className="header-menu">Report Problem</span>
          <span className="header-menu">Help</span>
        </div>
      </Col>
  </Row>
</div>
)

export default Header;
