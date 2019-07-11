import React from "react";
import { Card, Row, Col, Avatar, Icon, Popover } from "antd";
import "./style.sass";

const Content = ({logout}) => {
  return (
    <span className="menu-child-profile" onClick={()=>logout()}>
      <Icon type="logout" />
      <span style={{ paddingLeft: 8 }}>Logout</span>
    </span>
  );
};

const MenuProfile = ({ admin, photo, code, logout }) => {
  return (
    <Card>
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <Avatar src={photo} alt="photo admin" />
        </Col>
        <Col>
          <b>
            <span>{admin}</span>
          </b>
          <br />
          <span className="mp-code-profile">{`Code ${code}`}</span>
        </Col>
        <Col>
          <Popover
            placement="right"
            title={"Profile Admin"}
            content={<Content logout={logout}/>}
            trigger="hover"
          >
            <Icon type="right" className="menu-child-profile"/>
          </Popover>
        </Col>
      </Row>
    </Card>
  );
};

export default MenuProfile;
