import React from "react";
import PropTypes from "prop-types";
import "./style.sass";
import ButtonTextIcon from "../ButtonTextIcon";

const OrderFullAction = ({ onClickUndo, onClickCancel, onClickAddNotes }) => {
  return (
    <div className="action-container">
      <div className="action">
        <ButtonTextIcon icon="rollback" label="Undo" onClick={onClickUndo} />
      </div>
      <div className="order-action">
        <ButtonTextIcon icon="close-circle" label="Cancle Order" onClick={onClickCancel} />
      </div>
      <div className="order-action">
        <ButtonTextIcon icon="message" label="Add Admin Notes" onClick={onClickAddNotes} />
      </div>
    </div>
  );
};

OrderFullAction.propTypes = {
  onClickNotes: PropTypes.func,
  onClickCancel: PropTypes.func,
  onClickAddNotes: PropTypes.func
};

export default OrderFullAction;
