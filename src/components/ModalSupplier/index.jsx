import React from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col, Modal, Button, Divider, Icon, notification } from "antd";
import "./style.sass";
// import { currencyYuan } from "../../helpers/currency";
import OrderVariant from "../../components/OrderVariant";

const ModalSupplier = ({ order, visible, onOk }) => {
  const copyDetailOrder = () => {
    notification.info({
      message: "Copied to Clipboard",
      description:
        "The order detail is copied to the clipboard, use the copied detail to do the purchasing process"
    });
    setTimeout(() => {
      console.log("error");
    }, 6000);
  };
  const copyEmailAddress = () => {
    notification.info({
      message: "Copied to Clipboard",
      description:
        "The email address is copied to the clipboard, use the copied email to do the purchasing process"
    });
    setTimeout(() => {
      console.log("error");
    }, 6000);
  };
  console.log(order);
  return (
    <Modal
      bodyStyle={{ padding: "0" }}
      className="supplier__modal"
      visible={visible}
      footer={null}
      closable={false}
    >
      {order.indexes.map(index => (
        <div key={index.id}>
          <Row className="supplier__modal__detail-order">
            <Col md={4} className="supplier__modal__detail-order__image-box">
              <div>
                <img src={index.productImage} alt="" />
              </div>
            </Col>
            <Col md={20} className="supplier__modal__detail-order__variant">
              <Row>
                <Col md={14}>
                  <p>
                    Invoice No. <span>{order.invoiceNumber}</span>
                  </p>
                  <b>{index.productNameChina}</b>
                  <p>{index.productName}</p>
                </Col>
                <Col md={10} className="supplier__modal__copy-detail">
                  <CopyToClipboard
                    text={index.productName}
                    onCopy={copyDetailOrder}
                  >
                    <span>Copy Detail</span>
                  </CopyToClipboard>
                </Col>
              </Row>
              <Row>
                <Col md={14}>
                  <OrderVariant
                    key={index.id}
                    variants={index.variants}
                    quantity={index.productQuantity}
                  />
                </Col>
                <Col md={10} className="supplier__modal__customer-note">
                  <span>Customer Note :</span>
                  <br />
                  {index.note}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className="supplier__modal__divider" />
          <div className="supplier__modal__detail-address">
            <Row>
              <Col span={24}>
                <span className="supplier__modal__detail-address__important">
                  {index.supplier.name}
                </span>
                <br />
                <span>{index.supplier.address}</span>
              </Col>
            </Row>
            <Row className="supplier__modal__detail-address__row-separator">
              <Col span={8}>
                <span>Mobile Phone</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="phone"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.phone}
                </span>
              </Col>
              <Col>
                <span span={16}>Email</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="mail"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.email}
                  <CopyToClipboard
                    text={index.supplier.contact.email}
                    onCopy={copyEmailAddress}
                  >
                    <span>
                      {" "}
                      -{" "}
                      <span className="supplier__modal__detail-address__copy-email">
                        Copy Email
                      </span>
                    </span>
                  </CopyToClipboard>
                </span>
              </Col>
            </Row>
            <Row className="supplier__modal__detail-address__row-separator">
              <Col span={8}>
                <span>Phone</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="phone"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.phone1}
                </span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="phone"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.phone2}
                </span>
              </Col>
              <Col span={8}>
                <span>WeChat ID</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="wechat"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.wechatId}
                </span>
              </Col>
              <Col span={8}>
                <span>QQ ID</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="wechat"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {index.supplier.contact.qqId}
                </span>
              </Col>
            </Row>
            <Row className="supplier__modal__detail-address__row-separator">
              <Col span={24}>
                <span>Supplier Note :</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  {index.supplier.note}
                </span>
              </Col>
            </Row>
            <br />
            <Row type="flex" justify="end">
              <Col>
                <Button
                  className="supplier__modal__button-OK"
                  type="primary"
                  onClick={onOk}
                >
                  OK
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </Modal>
  );
};

ModalSupplier.propTypes = {
  supplier: PropTypes.object
};

export default ModalSupplier;
