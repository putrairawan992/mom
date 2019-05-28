import React, { useRef, useState } from "react";
import { Modal, Button, Row, Col, Icon } from "antd";
import PropTypes from "prop-types";
import "./style.sass";
import ReactToPrint from "react-to-print";
import LabelChina from "../LabelChina";

const ModalConfirmPrint = ({
  title,
  description,
  visible,
  onOk,
  onCancel,
  loading
}) => {
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      //onCancel={onCancel}
      footer={null}
      closable={false}
      width={600}
      bodyStyle={{ padding: 30 }}
    >
      <Row>
        <Col span={2}>
          <Icon
            type="check-circle"
            style={{ fontSize: 24, color: "#52C41A" }}
          />
        </Col>
        <Col span={22}>
          <Row>
            <Col>
              <span className="confirm-title">{title}</span>
            </Col>
          </Row>
          <br />
          <br />
          <Row type="flex" justify="end">
            <Col>
              <span className="cancel" onClick={onCancel}>
                Print Later
              </span>
              <ReactToPrint
                trigger={() => (
                  <Button
                    onClick={onOk}
                    type="primary"
                    size="large"
                    className="button-primary"
                  >
                    Print Now
                  </Button>
                )}
                content={() => componentRef.current}
                onBeforePrint={()=> setShow(true)}
              />
              <div style={{display: "none"}}>
                <LabelChina show={show}ref={componentRef} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

ModalConfirmPrint.prototype = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalConfirmPrint;
