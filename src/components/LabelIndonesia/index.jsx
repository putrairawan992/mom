import React, { Component } from "react";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import "./style.css";
import { Divider } from "antd";
import LabelContent from "../LabelContent";
import LabelDetailJne from "../LabelDetailJne";

class LabelIndonesia extends Component {
  render() {
    const { invoiceNumber, order } = this.props.invoice;
    const { barcodeNumber } = this.props;
    return (
      <div className="label-indonesia">
        <div className="label-box">
          <div className="title-image">
            <img src={monggopesen_logo} alt="monggopesen" />
          </div>
          <Divider />
          <div className="label-from">
            <LabelContent
              label="Pengirim"
              content="Monggopesen.com"
              styleContent="label-form-content"
            />
            <LabelContent
              label="Invoice"
              content={"#" + invoiceNumber}
              styleContent="label-indo-invoice"
            />
          </div>
          <Divider />
          <div className="label-from">
            <LabelContent
              label="Penerima"
              content={order.orderAddress.receiverName}
              styleContent="label-form-content"
            />
            <LabelContent
              label="Alamat"
              content={`${order.orderAddress.labelName}, ${
                order.orderAddress.fullAddress
              }, ${order.orderAddress.subdistrict}, ${
                order.orderAddress.city
              }, ${order.orderAddress.province}, ${order.orderAddress.zipcode}`}
            />
            <LabelContent
              label="Telp"
              content={order.orderAddress.phoneNumber}
              styleContent="label-form-content"
            />
          </div>
          <Divider />
          <div className="label-from">
            <LabelContent
              label="Deskripsi"
              content={
                order.orderItems[0].supplierSnapshot.name +
                " - " +
                order.orderItems[0].supplierSnapshot.code
              }
              styleContent="label-form-content"
            />
          </div>
          <Divider />
          <LabelDetailJne order={order} barcodeNumber={barcodeNumber} isBarcode={true} />
        </div>
      </div>
    );
  }
}

export default LabelIndonesia;
