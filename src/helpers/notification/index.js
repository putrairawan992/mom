import React from "react";
import { notification, Icon } from "antd";
import propType from "prop-types";
import classNames from "classnames";
import style from "./style.sass";

const contentNotification = (message, description, icon, type) => {
  const classNamesStyle = classNames.bind(style);
  const selectClassCss = classNamesStyle({
    "mp-notif-icon-primary": type === "primary",
    "mp-notif-icon-secondary": type === "secondary"
  });

  notification.open({
    message: message,
    description: description,
    icon: <Icon type={icon} theme="filled" className={selectClassCss} />,
    style: {
      width: 500,
      marginLeft: 400 - 508
    }
  });
};

contentNotification.propType = {
  message: propType.string,
  description: propType.string,
  icon: propType.string,
  type: propType.oneOf(["primary", "secondary"])
};

contentNotification.defaultProps = {
  type: "primary",
  icon: "check-circle"
};

export default contentNotification;
