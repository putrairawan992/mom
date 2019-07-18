import React from "react";
import "./style.sass";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { Row, Col, Divider, Icon, Modal } from "antd";
import convertTimesTime from "../../helpers/convertTimestime";
import LabelContent from "../../components/LabelContent";
import LabelDetailJne from "../../components/LabelDetailJne";

const ModalDetailOrder = ({ invoice, visible, onOk, barcodeNumber }) => {
  console.log("invoice", invoice);
  return (
    <Modal
      centered
      bodyStyle={{ padding: "0" }}
      className="DetailOrder__modal"
      visible={visible}
      footer={null}
      closable={false}
    >
      {invoice.order.orderItems.map(item => (
        <div key={item.id}>
          <Row className="DetailOrder__modal__detail-order">
            <Col md={6} className="DetailOrder__modal__detail-order__image-box">
              <div>
                <img src={item.productSnapshot.image.defaultImage} alt="" />
              </div>
            </Col>
            <Col md={18} className="DetailOrder__modal__detail-order__variant">
              <Row>
                <Col md={24}>
                  <span>
                    Invoice No. <span>{invoice.invoiceNumber}</span>
                  </span>
                  <br />
                  <b>{item.productSnapshot.nameChina}</b>
                  <span>({item.productSnapshot.name})</span>
                </Col>
                <LabelContent
                  label="Paid Time"
                  content={convertTimesTime.TypeMillisecondWithoutSecond(
                    invoice.order.orderActivityDate.orderDate
                  )}
                />
                <LabelContent
                  label="Delivery"
                  content={"By " + item.shipment.via}
                />
              </Row>
              <Row>
                <Col md={24} style={{marginTop:"16px", fontSize:"16px", fontWeight:"500"}}>
                    <span style={{marginRight:"8px"}} className="varian-label-color">Varian :</span>
                    <span className="varian-content-color">{item.productSnapshot.variants}</span>
                    <span style={{margin:"0 8px 0 20px"}} className="varian-label-color">Qty :</span>
                    <span className="varian-content-color">{item.productSnapshot.quantity}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className="DetailOrder__modal__divider" />
          <div className="DetailOrder__modal__detail-address">
            <Row>
              <LabelContent
                label="Customer"
                content={invoice.order.customer.name}
              />
              <LabelContent
                label="Address"
                content={`${invoice.order.orderAddress.labelName}, ${
                  invoice.order.orderAddress.fullAddress
                }, ${invoice.order.orderAddress.subdistrict}, ${
                  invoice.order.orderAddress.city
                }, ${invoice.order.orderAddress.province}, ${
                  invoice.order.orderAddress.zipcode
                }`}
              />
              <LabelContent
                label="Phone"
                content={invoice.order.customer.phoneNumber}
              />
              <LabelContent label="Note" content={item.note} />
            </Row>
            <Row className="DetailOrder__modal__detail-address__row-separator">
              <LabelDetailJne order={invoice.order} barcodeNumber={barcodeNumber} />
            </Row>
            <br />
            <Row type="flex" justify="end">
              <Col>
                <Button
                  //   className="DetailOrder__modal__button-OK"
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

ModalDetailOrder.propTypes = {
  DetailOrder: PropTypes.object
};

export default ModalDetailOrder;
