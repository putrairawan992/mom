import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

const OrderUndo = ({ onClickUndo }) => {
  return (
    <table border={0} style={{marginLeft:300}}>
      <tbody>
        <tr className="row-action">
          <td>
            <span className="span-icon" onClick={onClickUndo}>
              <Icon type="rollback" />
              &nbsp;Undo
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderUndo.propTypes = {
  onClickUndo: PropTypes.func
};

export default OrderUndo;
