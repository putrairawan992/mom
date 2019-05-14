import React from "react";
import PropTypes from "prop-types";

const OrderVariant = ({variants, quantity}) => {
    let names = variants.map( (variant) => `${variant.value}`).join(', ');
    return(
        <p>{`Variant : ${names} Qty : ${quantity}`}</p>
    )
};

OrderVariant.propTypes = {
    variants : PropTypes.arrayOf(Object),
    quantity : PropTypes.string
};

export default OrderVariant;
