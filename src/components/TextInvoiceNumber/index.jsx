import React from "react";
import PropTypes from "prop-types";
import strings from '../../localization'
import "./style.sass";

const TextInvoiceNumber = ({invoiceNumber}) => {
  return (
    <div>
      {strings.invoice_no}<span className="invoice-number">{invoiceNumber}</span>
    </div>
  );
};

TextInvoiceNumber.propTypes = {
  invoiceNumber: PropTypes.string
};

export default TextInvoiceNumber;