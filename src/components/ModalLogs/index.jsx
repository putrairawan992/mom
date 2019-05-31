import React from "react";
import "./style.sass";
import { Modal, Button, Divider, Row, Col } from "antd";
import PropTypes, { object } from "prop-types";
import convertTimesTime from "../../helpers/convertTimestime";

const ModalLogs = ({ order, visible, onOk }) => {
  console.log("activityLogs", order.activityLogs);

  return (
    <Modal
      title="Activity Log"
      visible={visible}
      onOk={onOk}
      onCancel={onOk}
      footer={null}
    >
      {order.activityLogs.map(index => (
        <div className="log-status">
          <div className="log-status__admin">
            <b>{convertTimesTime.second(index.date)}</b> -{" "}
            <span>{index.admin}</span>
            <Divider type="vertical" />
            <span>{index.tabStatus}</span>
          </div>
          <span className="log-status__admin__note">{index.note}</span>
        </div>
      ))}
      <Row type="flex" justify="end">
        <Col>
          <Button className="log-status__button-OK" type="primary" onClick={onOk}>
            OK
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

ModalLogs.prototype = {
  logs: PropTypes.arrayOf(object)
};

export default ModalLogs;
