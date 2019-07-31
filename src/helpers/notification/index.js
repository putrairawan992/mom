import { notification } from "antd";
import propType from "prop-types";

const contentNotification = (message, description, type) => {
  notification[type]({
    message: message,
    description: description,
    style: {
      width: 500,
      marginLeft: 400 - 508
    }
  });
};

contentNotification.propType = {
  message: propType.string,
  description: propType.string,
  type: propType.oneOf(["success", "info", "warning", "error"])
};

contentNotification.defaultProps = {
  type: "success"
};

export default contentNotification;
