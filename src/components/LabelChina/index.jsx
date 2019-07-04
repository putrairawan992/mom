import React from "react";
import "./style.css";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Row, Col } from "antd";

class LabelChina extends React.Component {
  variants = variants => {
    return variants.map(variant => `${variant.value}`).join(", ");
  };
  render() {
    const {noInvoice, order } = this.props;
    return (
      <div className="label-body">
        <div className="label-china">
          <div className="label-invoice">
            <p>{noInvoice}</p>
          </div>
          {order.orderItems.map(item => {
            return (
              <div key={item.id} className="label-info">
                <div className="label-items-info">
                  <Row>
                    <Col md={4} className="label-item">
                      <span>Supplier</span>
                    </Col>
                    <Col md={1} className="item-colon">
                      <span>:</span>
                    </Col>
                    <Col md={18} className="label-item-info">
                      <span>{item.supplierSnapshot.name}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="label-item">
                      <span>Item</span>
                    </Col>
                    <Col md={1} className="item-colon">
                      <span>:</span>
                    </Col>
                    <Col md={18} className="label-item-info">
                      <span>{item.productSnapshot.name}</span>
                      <hr />
                      <span>{item.productSnapshot.nameChina}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="label-item">
                      <span>Variant</span>
                    </Col>
                    <Col md={1} className="item-colon">
                      <span>:</span>
                    </Col>
                    <Col md={18} className="label-item-info">
                      <span>
                        {this.variants(item.productSnapshot.informations)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="label-item">
                      <span>Qty</span>
                    </Col>
                    <Col md={1} className="item-colon">
                      <span>:</span>
                    </Col>
                    <Col md={18} className="label-item-info">
                      <span>{item.productSnapshot.quantity}</span>
                    </Col>
                  </Row>
                </div>

                <Row className="label-items-cust">
                  <Col md={4} className="item-cust">
                    <span>Cust</span>
                  </Col>
                  <Col md={1} className="item-colon">
                    <span>:</span>
                  </Col>
                  <Col md={18} className="item-cust-info">
                    <span>{order.customer.name}</span>
                  </Col>
                </Row>
              </div>
            );
          })}
          <div className="label-logo-bottom">
            <img
              src={monggopesen_logo}
              alt="monggopesen"
              style={{ height: "16px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LabelChina;
