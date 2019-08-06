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
    const invoiceNum = "#" + invoiceNumber;
    const receiverName = order.orderAddress.receiverName;
    const phoneNumber = order.orderAddress.phoneNumber;
    const productName = order.orderItems[0].productSnapshot.name;
    const address = `${order.orderAddress.labelName}, ${
      order.orderAddress.fullAddress
    }, ${order.orderAddress.subdistrict}, ${order.orderAddress.city}, ${
      order.orderAddress.province
    }, ${order.orderAddress.zipcode}`;

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
              content={invoiceNum}
              styleContent="label-indo-invoice"
            />
          </div>
          <Divider />
          <div className="label-from">
            <LabelContent
              label="Penerima"
              content={receiverName}
              styleContent="label-form-content"
            />
            <LabelContent label="Alamat" content={address} />
            <LabelContent
              label="Telp"
              content={phoneNumber}
              styleContent="label-form-content"
            />
          </div>
          <Divider />
          <div className="label-from">
            <LabelContent
              label="Deskripsi"
              content={productName}
              styleContent="label-form-content"
            />
          </div>
          <Divider />
          <LabelDetailJne
            order={order}
            barcodeNumber={barcodeNumber}
            isBarcode={true}
          />
        </div>
      </div>
    );
  }
}

export default LabelIndonesia;
