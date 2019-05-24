import React from "react";
import { Modal, Button } from "antd";
import PropTypes, { object } from "prop-types";

const ModalNote = props => {
  return (
    <Modal
      title="Notes Admin"
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

ModalNote.prototype = {
  logs: PropTypes.arrayOf(object)
};

export default ModalNote;
