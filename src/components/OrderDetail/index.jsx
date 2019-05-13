import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const OrderDetail = props => {
  return (
    <Row>
      <Col span={5}><p>Gambar</p></Col>
      <Col span={19}>
          <p>Invoice No. INV1904041234</p>
          <p>Naik Air Max 270系列全季 (Naik Air Max 270 Series All Season)</p>
          <p>Paid Time : 28-02-2019 13:20</p>
          <p>Delivery : By Air</p>
          <p>Price : 2000</p>
          <p>Note : Please wrap it tightly</p>
      </Col>
    </Row>
  );
};

OrderDetail.propTypes = {};

export default OrderDetail;
