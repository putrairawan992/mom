import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Input } from "antd";
//import "./style.sass";
const { TextArea } = Input;

const ModalAddNote = ({ visible, onUndo, onCancle, loading,invoiceId }) => {
  return (
    <Modal
      visible={visible}
      title="[ Need Purchase] Note"
      onOk={onUndo}
      onCancel={onCancle}
      footer={[
        <Button key="back" onClick={onCancle}>
          Cancle
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={()=>onUndo(invoiceId)}>
          Save
        </Button>
      ]}
    >
      <span>This Note Will be saved into activity log in this order only</span>
      <br />
      <TextArea
        placeholder="Write some notes here.."
        autosize={{ minRows: 3, maxRows: 6 }}
      />
    </Modal>
  );
};

ModalAddNote.propTypes = {
  visible: PropTypes.bool,
  onUndo: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  invoiceId: PropTypes.string
};

export default ModalAddNote;
