import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const ImageShipping = ({ shipping }) => {
  let image;
  if (shipping === "sea")
    image = require("../../assets/img/icon_shipping/ic_By_Sea.png");
  else image = require("../../assets/img/icon_shipping/ic_By_Air.png");
  return <img src={image} alt={shipping} className="image-shipping" />;
};

ImageShipping.propTypes = {
  shipping: PropTypes.string
};

export default ImageShipping;
