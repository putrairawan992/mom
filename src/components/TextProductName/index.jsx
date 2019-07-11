import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const TextProductName = ({productTextChina, productTextIndonesia}) => {
  return (
    <span>
      <b>{productTextChina}</b><span>({productTextIndonesia})</span>
    </span>
  );
};

TextProductName.propTypes = {
    productTextChina: PropTypes.string,
    productTextIndonesia: PropTypes.string
};

export default TextProductName;