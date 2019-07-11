import React from "react";
import PropTypes from "prop-types";
import "./style.sass";
import convertTimesTime from "../../helpers/convertTimestime";

const OrderDetailIndonesia = ({ prevStatus, supplier, customer, time }) => {
  return (
    <table border={0}>
      <tbody>
        <tr>
          <td width="130px">
            <span>Supplier </span>
          </td>
          <td>:</td>
          <td>
            <span>{supplier}</span>
          </td>
        </tr>
        <tr>
          <td width="130px">
            <span>Customer </span>
          </td>
          <td>:</td>
          <td>
            <span>{customer}</span>
          </td>
        </tr>
        <tr>
          <td width="130px">
            <span>{prevStatus}</span>
          </td>
          <td>:</td>
          <td>
            <span>{convertTimesTime.millisecond(time)}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderDetailIndonesia.propTypes = {
  prevStatus: PropTypes.string,
  supplier: PropTypes.string,
  customer: PropTypes.string,
  time: PropTypes.number
};

export default OrderDetailIndonesia;
