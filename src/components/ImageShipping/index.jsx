import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const ImageShipping = ({ shipping }) => {
  let image;
  if (shipping === "sea")
    image = require("../../assets/img/icon_shipping/ic_shipping_sea.png");
  else image = require("../../assets/img/icon_shipping/ic_shipping_air.png");
  return <img src={image} alt={shipping} className="image-shipping" />;
};

ImageShipping.propTypes = {
  shipping: PropTypes.string
};

export default ImageShipping;
