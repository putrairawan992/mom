import React, { Component } from "react";
import "./style.css";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png"
import { Row, Col } from "antd";

class LabelChina extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="label-body">
        <div className="label-china">
          <div className="label-invoice">
            <p>#INV123454321</p>
          </div>
          <div className="label-info">
            <div className="label-items-info">
              <Row>
                <Col md={4} className="label-item">
                  <span>Supplier</span>
                </Col>
                <Col md={1} className="item-colon">
                  <span>:</span>
                </Col>
                <Col md={18} className="label-item-info">
                  <span>Western General</span>
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
                  <span>
                    Naik air max aik air max aik air max aik air max aik air max
                  </span>
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
                  <span>Blue</span>
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
                  <span>2</span>
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
                <span>Bowo</span>
              </Col>
            </Row>
          </div>
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
