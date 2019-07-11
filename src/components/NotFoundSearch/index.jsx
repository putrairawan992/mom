import React from "react";
import { Row, Col, Card } from "antd";
import "./style.sass";

const NotFoundSearch = () => {
  return (
    <Card className="card-not-found">
      <Row type="flex" justify="space-around" align="middle">
        <Col>
          <center>
            <span>1234 ?</span><br/>
            <span>Hmm.. I can't find it</span><br />
            <img
              className="image-not-found"
              src={require("../../assets/img/ic_background/ic_order_notfound.png")}
              alt="not found order search"
            />
          </center>
        </Col>
      </Row>
    </Card>
  );
};

export default NotFoundSearch;
