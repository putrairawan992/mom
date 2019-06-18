import React from "react";
import PropTypes from "prop-types";
import "./style.sass";
import ButtonTextIcon from "../ButtonTextIcon";

const OrderNote = ({ onClickLog, onClickNotes }) => {
  return (
    <div>
      <ButtonTextIcon icon="file-exclamation" label="Show Logs" onClick={onClickLog} />
      <ButtonTextIcon icon="file-text" label="Show Admin Notes" onClick={onClickNotes} />
    </div>
  );
};

OrderNote.propTypes = {
  onClickLog: PropTypes.func,
  onClickNotes: PropTypes.func
};

export default OrderNote;
