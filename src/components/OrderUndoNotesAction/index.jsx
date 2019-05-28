import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

const OrderUndoNotesAction = ({ onClickUndo, onClickAddNotes }) => {
  return (
    <table border={0} style={{marginLeft:135}}>
      <tbody>
        <tr className="row-action">
          <td>
            <span className="span-icon" onClick={onClickUndo}>
              <Icon type="rollback" />
              &nbsp;Undo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </td>
          <td>
            <span className="span-icon" onClick={onClickAddNotes}>
              <Icon type="message" />
              &nbsp;Add Admin Notes
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderUndoNotesAction.propTypes = {
  onClickUndo: PropTypes.func,
  onClickAddNotes: PropTypes.func
};

export default OrderUndoNotesAction;
