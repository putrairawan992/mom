import React from "react";
import PropTypes from "prop-types";
import "./style.sass";
import convertTimesTime from "../../helpers/convertTimestime";

const OrderDetailIndonesia = ({ prevStatus, item, time }) => {
  return (
    <table border={0}>
      <tbody>
        <tr>
          <td>
            <span>Supplier </span>
          </td>
          <td>:</td>
          <td>
            <span>{item.supplierSnapshot.name}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>Customer </span>
          </td>
          <td>:</td>
          <td>
            <span>{item.note}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>{prevStatus}</span>
          </td>
          <td>:</td>
          <td>
            <span>{time}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OrderDetailIndonesia.propTypes = {
  prevStatus: PropTypes.string,
  item: PropTypes.object
};

export default OrderDetailIndonesia;
