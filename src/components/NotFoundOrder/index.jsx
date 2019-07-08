import React from "react";
import { Row, Col, Card } from "antd";
import "./style.sass";

const NotFoundOrder = () => {
  return (
    <Card className="card-not-found">
      <Row type="flex" justify="space-around" align="middle">
        <Col>
          <center>
            <span>Zzzz.. Nothing is here</span>
            <br />
            <img
              className="image-not-found"
              src={require("../../assets/img/ic_background/ic_empty_order.png")}
              alt="not found order"
            />
          </center>
        </Col>
      </Row>
    </Card>
  );
};

export default NotFoundOrder;
