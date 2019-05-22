import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import "./style.sass";

const OrderDetail = ({ order }) => {
  return order.indexes.map(index => (
    <Row key={index.id} className="order-detail-container">
      <Col span={5}>
        <img
          style={{ height: 80, width: 80 }}
          src={index.productImage}
          alt=""
        />
      </Col>
      <Col>
        <span>Invoice No. {order.invoiceNumber}</span> <br />
        <span>{index.productNameChina} ({index.productName})</span><br />
        <table border={0}>
          <tbody>
            <tr>
              <td style={{paddingRight: 20}}><span>Respond Time </span></td>
              <td>:</td>
              <td><span>28-02-2019 13:20</span></td>
            </tr>
            <tr>
              <td><span>Customer Note </span></td>
              <td>:</td>
              <td><span>{index.note}</span></td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  ));
};

OrderDetail.propTypes = {
  order: PropTypes.object
};

export default OrderDetail;
