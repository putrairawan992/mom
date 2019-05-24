import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Modal, Button } from "antd";
//import "./style.sass";
import { currencyYuan } from "../../helpers/currency";
import OrderVariant from "../../components/OrderVariant";

const ModalSupplier = ({ order, visible, onOk }) => {
  return (
    <Modal visible={visible} footer={null} closable={false}>
      {order.indexes.map(index => (
        <div key={index.id}>
          <Row type="flex" justify="space-between">
            <Col span={5}>
              <img
                style={{ height: 80, width: 80 }}
                src={index.productImage}
                alt=""
              />
            </Col>
            <Col span = {15}>
              <span>{index.productNameChina}</span><br />
              <span>{index.productName}</span><br />
              <OrderVariant
                key={index.id}
                variants={index.variants}
                quantity={index.productQuantity}
              />
            </Col>
            <Col span={4}>
                <span>Copy Detail</span><br/><br/>
                <span>{currencyYuan(index.price)}</span>
            </Col>
          </Row>
          <hr/>
          <Row>
              <Col span={24}>
                <span>{index.supplier.name}</span><br/>
                <span>{index.supplier.address}</span>
              </Col>
          </Row>
          <Row>
              <Col span={10}>
                <span>Mobile Phone</span><br/>
                <span>{index.supplier.contact.phone}</span>
              </Col>
              <Col>
                <span span={14}>Email</span><br/>
                <span>{index.supplier.contact.email}</span>
              </Col>
          </Row>
          <br/>
          <Row type="flex" justify="end">
            <Col>
                <Button type="primary" onClick={onOk}>OK</Button>
            </Col>
          </Row>
          
        </div>
      ))}
    </Modal>
  );
};

ModalSupplier.propTypes = {
  supplier: PropTypes.object
};

export default ModalSupplier;
