import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const OrderVariant = ({ variants, quantity, span }) => {
  let names = variants.map(variant => `${variant.value}`).join(", ");
  return (
    <Row>
      <Col span={span}></Col>
      <Col>
        <p style={{fontSize: 16}}>{`Variant : ${names} Qty : ${quantity}`}</p>
      </Col>
    </Row>
  );
};

OrderVariant.propTypes = {
  variants: PropTypes.arrayOf(Object),
  quantity: PropTypes.string
};

export default OrderVariant;
