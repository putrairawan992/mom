import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import "./style.sass";
import { currencyYuan } from "../../helpers/currency";

const OrderDetail = ({ order }) => {
  return order.indexes.map(index => (
    <Row key={index.id}>
      <Col span={5}>
        <img
          style={{ height: 80, width: 80 }}
          src={index.productImage}
          alt=""
        />
      </Col>
      <Col span={19}>
        <p>
          <span>Invoice No. {order.invoiceNumber}</span> <br />
          <span>{index.productNameChina} ({index.productName})</span><br />
          <span>Paid Time : 28-02-2019 13:20</span><br />
          <span>Delivery : By Air</span><br />
          <span>Price : {currencyYuan(index.price)}</span><br />
          <span>Note : {index.note}</span>
        </p>
      </Col>
    </Row>
  ));
};

OrderDetail.propTypes = {
  order: PropTypes.object
};

export default OrderDetail;
