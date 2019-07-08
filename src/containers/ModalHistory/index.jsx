import React from "react";
import "./style.sass";
import { Modal, Divider, Row, Col } from "antd";
import Button from "../../components/Button";
import PropTypes, { object } from "prop-types";
import convertTimesTime from "../../helpers/convertTimestime";

const ModalHistory = ({ title, logs, visible, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      {logs.map((log) => (
        <div className="log-status" key={log.id}>
          <div className="log-status__admin">
            <b>{convertTimesTime.millisecond(log.createdDate)}</b> -{" "}
            <span>{log.createBy}</span>
            <Divider type="vertical" />
            <span>{"status (need data)"}</span>
          </div>
          <span className="log-status__admin__note">{log.note}</span>
        </div>
      ))}
      <Row type="flex" justify="end">
        <Col>
          <Button
            // className="log-status__button-OK"
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

ModalHistory.propTypes = {
  title: PropTypes.string,
  logs: PropTypes.arrayOf(object),
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default ModalHistory;
