import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const TextProductName = ({productTextChina, productTextIndonesia}) => {
  return (
    <div>
      <span className="product-name-china">{productTextChina}</span><span>({productTextIndonesia})</span>
    </div>
  );
};

TextProductName.propTypes = {
    productTextChina: PropTypes.string,
    productTextIndonesia: PropTypes.string
};

export default TextProductName;