import React from "react";
import PropTypes from "prop-types";
import "./style.sass";

const OrderDetailIndonesia = ({ prevStatus, index }) => {
  return (
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <span>Supplier </span>
          </td>
          <td>:</td>
          <td>
            <span>{index.note}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>Customer </span>
          </td>
          <td>:</td>
          <td>
            <span>{index.note}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>{prevStatus}</span>
          </td>
          <td>:</td>
          <td>
            <span>28-02-2019 13:20</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderDetailIndonesia.propTypes = {
  prevStatus: PropTypes.string,
  index: PropTypes.object
};

export default OrderDetailIndonesia;
