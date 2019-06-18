import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

const ButtonTextIcon = ({ onClick, icon, label}) => {
  return (
    <span className="mp-btn-txt-icon-primary" onClick={onClick}>
      <Icon type={icon} />
      &nbsp;{label}
    </span>
  );
};

ButtonTextIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default ButtonTextIcon;
