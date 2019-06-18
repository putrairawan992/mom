import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const TextInvoiceNumber = ({invoiceNumber}) => {
  return (
    <div>
      Invoice No. <span className="invoice-number">{invoiceNumber}</span>
    </div>
  );
};

TextInvoiceNumber.propTypes = {
  invoiceNumber: PropTypes.string
};

export default TextInvoiceNumber;