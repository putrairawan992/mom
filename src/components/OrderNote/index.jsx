import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

const OrderNote = ({ onClickLog, onClickNotes }) => {
  return (
    <table border={0} className="table-note-container">
      <tbody>
        <tr className="row-note">
          <td>
            <span className="span-icon" onClick={onClickLog}>
              <Icon type="file-exclamation" className="icon-note" />
              &nbsp;Show Logs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </td>
          <td>
            <span className="span-icon" onClick={onClickNotes}>
              <Icon type="file-text" className="icon-note" />
              &nbsp;Show Admin Notes
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderNote.propTypes = {
    onClickLog: PropTypes.func,
    onClickNotes: PropTypes.func
};

export default OrderNote;
