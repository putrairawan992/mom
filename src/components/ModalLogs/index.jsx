import React from "react";
import "./style.sass";
import { Modal, Button, Divider, Row, Col } from "antd";
import PropTypes, { object } from "prop-types";
import convertTimesTime from "../../helpers/convertTimestime";

const ModalLogs = ({ order, visible, onOk }) => {
  console.log("order log", order);

  console.log("activityLogs", order.activityLogs);

  return (
    <Modal
      title="Activity Log"
      centered
      visible={visible}
      onOk={onOk}
      onCancel={onOk}
      footer={null}
    >
      {order.activityLogs.map((activityLog, index) => (
        <div className="log-status" key={index}>
          <div className="log-status__admin">
            <b>{convertTimesTime.second(activityLog.date)}</b> -{" "}
            <span>{activityLog.admin}</span>
            <Divider type="vertical" />
            <span>{activityLog.tabStatus}</span>
          </div>
          <span className="log-status__admin__note">{activityLog.note}</span>
        </div>
      ))}
      <Row type="flex" justify="end">
        <Col>
          <Button
            className="log-status__button-OK"
            type="primary"
            onClick={onOk}
          >
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
