import React from "react";
import "./style.sass";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col, Divider, Icon, Modal, notification } from "antd";
import OrderVariant from "../../components/OrderVariant";

const ModalSupplier = ({ invoice, visible, onOk }) => {
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
  return (
    <Modal
      bodyStyle={{ padding: "0" }}
      className="supplier__modal"
      visible={visible}
      footer={null}
      closable={false}
    >
      {invoice.order.orderItems.map(item => (
        <div key={item.id}>
          <Row className="supplier__modal__detail-order">
            <Col md={4} className="supplier__modal__detail-order__image-box">
              <div>
                <img src={item.productSnapshot.image.defaultImage} alt="" />
              </div>
            </Col>
            <Col md={20} className="supplier__modal__detail-order__variant">
              <Row>
                <Col md={14}>
                  <p>
                    Invoice No. <span>{invoice.invoiceNumber}</span>
                  </p>
                  <b>{item.productSnapshot.nameChina}</b>
                  <p>{item.productSnapshot.name}</p>
                </Col>
                <Col md={10} className="supplier__modal__copy-detail">
                  <CopyToClipboard
                    text={item.productSnapshot.name}
                    onCopy={copyDetailOrder}
                  >
                    <span>Copy Detail</span>
                  </CopyToClipboard>
                </Col>
              </Row>
              <Row>
                <Col md={14}>
                  <OrderVariant
                    variants={item.productSnapshot.informations}
                    quantity={item.productSnapshot.quantity}
                    price={item.productSnapshot.price}
                    withPrice={true}
                  />
                </Col>
                <Col md={10} className="supplier__modal__customer-note">
                  <span>Customer Note :</span>
                  <br />
                  {item.note}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className="supplier__modal__divider" />
          <div className="supplier__modal__detail-address">
            <Row>
              <Col span={24}>
                <span className="supplier__modal__detail-address__important">
                  {item.supplierSnapshot.name}
                </span>
                <br />
                <span>{item.supplierSnapshot.address}</span>
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
                  {item.supplierSnapshot.phone1}
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
                  {item.supplierSnapshot.email}
                  <CopyToClipboard
                    text={item.supplierSnapshot.email}
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
                  {item.supplierSnapshot.phone1}
                </span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  <Icon
                    type="phone"
                    className="supplier__modal__detail-address__icon-style"
                  />
                  {item.supplierSnapshot.phone2}
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
                  {item.supplierSnapshot.weChat}
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
                  {item.supplierSnapshot.qq}
                </span>
              </Col>
            </Row>
            <Row className="supplier__modal__detail-address__row-separator">
              <Col span={24}>
                <span>Supplier Note :</span>
                <br />
                <span className="supplier__modal__detail-address__important">
                  {item.supplierSnapshot.notes}
                </span>
              </Col>
            </Row>
            <br />
            <Row type="flex" justify="end">
              <Col>
                <Button
                  //   className="supplier__modal__button-OK"
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
