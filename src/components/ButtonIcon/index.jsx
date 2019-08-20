import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

export default function ButtonIcon(props) {
  return (
    <div className="mp-wrap-btn-icon" onClick={props.onClick}>
      <span className="mp-btn-icon">
        <Icon type={props.icon} />
      </span>
    </div>
  );
};

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
