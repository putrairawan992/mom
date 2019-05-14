import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import "./style.sass";
import { currencyYuan } from "../../helpers/currency";
import OrderVariant from "../OrderVariant"

const OrderDetail = ({order}) => {
  return (
    order.indexes.map(index =>
    <Row key={index.id}>
      <Col span={5}>
        <img style={{height:80, width:80}} src={index.productImage} alt="" />
      </Col>
      <Col span={19}>
        <div>
          <p>Invoice No. {order.invoiceNumber} </p>
          <p>{index.productNameChina} ({index.productName})</p>
          <p>Paid Time : 28-02-2019 13:20</p>
          <p>Delivery : By Air</p>
          <p>Price : {currencyYuan(index.price)}</p>
          <p>Note : {index.note}</p>
          <OrderVariant variants={index.variants} quantity={index.productQuantity} />
        </div>
      </Col>
    </Row>
  ))
};

OrderDetail.propTypes = {
    order : PropTypes.object
};

export default OrderDetail;
