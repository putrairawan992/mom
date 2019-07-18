import React from "react";
import "./style.css";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import LabelContent from "../LabelContent";

class LabelChina extends React.Component {
  variants = variants => {
    return variants.map(variant => `${variant.value}`).join(", ");
  };

  productName = item => {
    return (
      <span>
        {item.productSnapshot.nameChina}
        <br />
        <span style={{ color: "#4A4A4A" }}>{item.productSnapshot.name}</span>
      </span>
    );
  };

  render() {
    const { noInvoice, order } = this.props;
    return (
      <div className="label-body">
        <div className="label-china">
          <div className="label-invoice">
            <span>#{noInvoice}</span>
          </div>
          {order.orderItems.map(item => {
            return (
              <div key={item.id} className="label-info">
                <div className="label-items-info">
                  <LabelContent
                    label="Supplier"
                    content={
                      item.supplierSnapshot.name +
                      " - " +
                      item.supplierSnapshot.code
                    }
                    styleContent="label-item-info"
                  />
                  <LabelContent
                    label="Item"
                    content={this.productName(item)}
                    styleContent="label-item-info"
                  />
                  <LabelContent
                    label="Variant"
                    content={this.variants(item.productSnapshot.informations)}
                    styleContent="label-item-info"
                  />
                  <LabelContent
                    label="Qty"
                    content={item.productSnapshot.quantity}
                    styleContent="label-item-info"
                  />
                </div>
                <LabelContent
                  label="Cust"
                  content={order.customer.name}
                  styleRow="label-items-cust"
                />
              </div>
            );
          })}
          <div className="label-logo-bottom">
            <img
              src={monggopesen_logo}
              alt="monggopesen"
              style={{ height: "12px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LabelChina;
