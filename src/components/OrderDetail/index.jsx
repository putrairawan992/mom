import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const OrderDetail = ({ invoiceNumber, index }) => {
  return (
    <div>
      <span>Invoice No. {invoiceNumber}</span> <br />
      <span>
        {index.productNameChina} ({index.productName})
      </span>
      <br />
      <table border={0}>
        <tbody>
          <tr>
            <td style={{ paddingRight: 20 }}>
              <span>Respond Time </span>
            </td>
            <td>:</td>
            <td>
              <span>28-02-2019 13:20</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Customer Note </span>
            </td>
            <td>:</td>
            <td>
              <span>{index.note}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object
};

export default OrderDetail;
