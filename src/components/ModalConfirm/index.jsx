import React from "react";
import { Modal, Button, Row, Col, Icon } from "antd";
import PropTypes from "prop-types";
import "./style.sass";

const ModalConfirm = ({
  title,
  description,
  value,
  visible,
  onOk,
  onCancel,
  loading
}) => {
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      //onCancel={onCancel}
      footer={null}
      closable={false}
      width={600}
      bodyStyle={{padding:30}}
    >
      <Row>
        <Col span={2}>
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ fontSize: 24, color: "#00AEE1" }}
          />
        </Col>
        <Col span={22}>
          <Row>
            <Col>
              <span className="confirm-title">{title}</span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <span className="confirm-description">{description}</span>
            </Col>
          </Row>
          <br/><br/>
          <Row type="flex" justify="end">
            <Col>
              <span className="cancel" onClick={onCancel}>
                Go Back
              </span>
              <Button
                onClick={()=>onOk(value)}
                type="primary"
                size="large"
                className="button-primary"
                loading={loading}
              >
                Yes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

ModalConfirm.prototype = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalConfirm;
