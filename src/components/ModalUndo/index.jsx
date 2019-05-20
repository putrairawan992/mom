import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import InputReason from "../InputReason.jsx";
//import "./style.sass";

const ModalUndo = ({ visible, onUndo, onCancle, loading, invoiceId }) => {
  const [reason, setReason] = useState({
    reason: "",
    note: ""
  });

  const actionReason = optionReason => {
    console.log(optionReason);
    
    setReason({ ...reason, reason: optionReason });
  };

  const actionNote = note => {
    setReason({ ...reason, note });
  };
  return (
    <Modal
      visible={visible}
      title="Are you going back / undo to previous process?"
      onOk={onUndo}
      onCancel={onCancle}
      footer={[
        <Button key="back" onClick={onCancle}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => onUndo(invoiceId)}
        >
          Undo
        </Button>
      ]}
    >
      <InputReason
        options={[
          { value: "101", name: "Wrong Press" },
          { value: "102", name: "Others" }
        ]}
        reason={reason.reason}
        onChangeReason={actionReason}
        onChangeNote={actionNote}
      />
    </Modal>
  );
};

ModalUndo.propTypes = {
  visible: PropTypes.bool,
  onUndo: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  invoiceId: PropTypes.string
};

export default ModalUndo;
