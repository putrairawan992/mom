import React from "react";
import PropTypes from "prop-types";
import { currencyYuan } from "../../helpers/currency";
import "./style.sass";

const OrderVariant = ({ variants, quantity, price, withPrice }) => {
  let names = variants.map(variant => `${variant.value}`).join(", ");
  return (
    <table border={1} className="table-container">
      <tbody>
        <tr>
          <td colSpan={2} className="row-variant">
            <span className="wrap-variant-text">Variant : <span className="variant-value">{names}</span></span>
            <span className="wrap-variant-text">Qty : <span className="variant-value">{quantity} </span></span>
          </td>
        </tr>
        {withPrice &&
        <tr>
          <td className="row-price">
            <span>
              Price : <b>{currencyYuan(price)}</b> x {quantity}
            </span>
          </td>
          <td className="row-price">
            <span>
              Total : <b>{currencyYuan(price * quantity)}</b>
            </span>
          </td>
        </tr>
        }
      </tbody>
    </table>
  );
};

OrderVariant.propTypes = {
  variants: PropTypes.arrayOf(Object),
  quantity: PropTypes.number,
  price: PropTypes.number,
  span: PropTypes.number
};

export default OrderVariant;
