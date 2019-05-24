import React from "react";
import { Modal, Button } from "antd";
import PropTypes, { object } from "prop-types";

const ModalLogs = props => {
  return (
    <Modal
      title="Activity Log"
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onOk}
      footer={null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button type="primary" onClick={props.onOk}>OK</Button>
    </Modal>
  );
};

ModalLogs.prototype = {
  logs: PropTypes.arrayOf(object)
};

export default ModalLogs;
