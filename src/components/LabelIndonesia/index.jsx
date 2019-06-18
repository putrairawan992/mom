import React, { Component } from "react";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import "./style.css";
import { Row, Col, Divider } from "antd";

class LabelIndonesia extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="label-indonesia">
        <div className="label-box">
          <div className="title-image">
            <img src={monggopesen_logo} alt="monggopesen" />
          </div>{" "}
          <Divider />
          <div className="label-from">
            <Row className="label-form-row">
              <Col md={3}>
                <span>From</span>
              </Col>
              <Col md={1} className="colon">
                <span>:</span>
              </Col>
              <Col md={18} className="label-form-content">
                <span>monggopesen.com</span>
              </Col>
            </Row>
            <Row className="label-form-row">
              <Col md={3}>
                <span>Invoice</span>
              </Col>
              <Col md={1} className="colon">
                <span>:</span>
              </Col>
              <Col md={18} className="label-indo-invoice">
                <span>#INV123454321</span>
              </Col>
            </Row>
          </div>
          <Divider />
          <div className="label-from">
            <Row className="label-form-row">
              <Col md={3}>
                <span>Deliver To</span>
              </Col>
              <Col md={1} className="colon">
                <span>:</span>
              </Col>
              <Col md={18} className="label-form-content">
                <span>Bowo</span>
              </Col>
            </Row>
            <Row className="label-form-row">
              <Col md={3}>
                <span>Address</span>
              </Col>
              <Col md={1} className="colon">
                <span>:</span>
              </Col>
              <Col md={18} className="label-form-address">
                <span>
                  Jl. Mangga Besar VIII RT.11/RW.1, RT.11/RW.1, Taman Sari, Kec.
                  Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta
                  11150
                </span>
              </Col>
            </Row>
            <Row className="label-form-row">
              <Col md={3}>
                <span>Telp</span>
              </Col>
              <Col md={1} className="colon">
                <span>:</span>
              </Col>
              <Col md={18} className="label-form-content">
                <span>+62 8123456789</span>
              </Col>
            </Row>
          </div>
          <Divider />
          <div className="label-box-date">
            <Row className="row-date-yes">
              <Col md={12} className="label-date">
                <span>23-05-2019 14:20</span>
              </Col>
              <Col md={12} className="label-yes">
                <span>YES</span>
              </Col>
            </Row>
          </div>
          <div className="label-box-detail">
            <Row className="label-detail-title">
              <Col md={8}>
                <span>Piece(s)</span>
              </Col>
              <Col md={8}>
                <span>Weight(s)</span>
              </Col>
              <Col md={8}>
                <span>Volume(cm)</span>
              </Col>
            </Row>
            <Row className="label-detail-content">
              <Col md={8}>
                <span>2 of 2</span>
              </Col>
              <Col md={8}>
                <span>1.4</span>
              </Col>
              <Col md={8}>
                <span>30 x 65 x 30</span>
              </Col>
            </Row>
          </div>
          <div className="label-box-bottom">
            <div style={{ padding: "6px" }}>
              <img src="" alt="JNE" style={{ height: "32px" }} />
            </div>
            <div>
              <img
                src="http://bwipjs-api.metafloor.com/?bcid=code128&text=%5EFNC1011234567890&parsefnc&alttext=%2801%291234567890"
                alt="Barcode"
                style={{ height: "46px" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelIndonesia;
