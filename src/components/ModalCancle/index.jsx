import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Select, Input } from "antd";
//import "./style.sass";

const Option = Select.Option;
const { TextArea } = Input;

const ModalCancle = ({ visible, onUndo, onCancle, loading,invoiceId }) => {
  return (
    <Modal
      visible={visible}
      title="Cancle Order"
      onOk={onUndo}
      onCancel={onCancle}
      footer={[
        <Button key="back" onClick={onCancle}>
          Back
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={()=>onUndo(invoiceId)}>
          Cancle Order
        </Button>
      ]}
    >
      <span>Canclelation Category</span>
      <br />
      <Select defaultValue="stock">
        <Option value="stock">Out Of Stock</Option>
        <Option value="other">Other</Option>
      </Select>
      <TextArea
        placeholder="Write some notes here.."
        autosize={{ minRows: 3, maxRows: 6 }}
      />
    </Modal>
  );
};

ModalCancle.propTypes = {
    visible: PropTypes.bool,
    onUndo: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    invoiceId: PropTypes.string
  };

export default ModalCancle;
