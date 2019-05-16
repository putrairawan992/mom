import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Icon } from "antd";
import "./style.sass"

const OrderAction = ({ undo, cancle, addNote }) => {
  return (
    <Row>
      <Col span={8}>
        <span className="span-icon" onClick={undo}>
          <Icon type="rollback"/>
          &nbsp;Undo
        </span>
      </Col>
      <Col span={8}>
        <span className="span-icon" onClick={cancle}>
          <Icon type="close-circle" />
          &nbsp;Cancle Order
        </span>
      </Col>
      <Col span={8}>
        <span className="span-icon" onClick={addNote}>
          <Icon type="message" />
          &nbsp;Add Note
        </span>
      </Col>
    </Row>
  );
};

OrderAction.propTypes = {
  invoiceId: PropTypes.string
};

export default OrderAction;
