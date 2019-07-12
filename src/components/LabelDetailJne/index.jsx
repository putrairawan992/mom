import React from "react";
import "./style.css";
import { Row, Col } from "antd";
import Barcode from "react-barcode";

const LabelDetailJne = props => {
  const { order, barcodeNumber } = props;
  return (
    <div className="label-box-jne">
      <div className="label-box-date">
        <Row>
          <Col span={12} className="label-date">
            <span>23-05-2019 14:20</span>
          </Col>
          <Col span={12} className="label-yes">
            <span>{order.courier.service}</span>
          </Col>
        </Row>
      </div>
      <div className="label-box-detail">
        <Row className="label-detail-title">
          <Col span={8}>
            <span>Piece(s)</span>
          </Col>
          <Col span={8}>
            <span>Weight(s)</span>
          </Col>
          <Col span={8}>
            <span>Volume(cm)</span>
          </Col>
        </Row>
        <Row className="label-detail-content">
          <Col span={8}>
            <span>2 of 2</span>
          </Col>
          <Col span={8}>
            <span>1.4</span>
          </Col>
          <Col span={8}>
            <span>30 x 65 x 30</span>
          </Col>
        </Row>
      </div>
      <div className="label-box-bottom">
        <div style={{ padding: "6px" }}>
          <img src="" alt="JNE" style={{ height: "32px" }} />
        </div>
        <div>
          {barcodeNumber ? (
            <Barcode
              value={barcodeNumber}
              width={1.5}
              height={40}
              margin={0}
              fontSize={8}
              fontOption="bold"
            />
          ) : (
            <div>
              <p>No. Resi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabelDetailJne;
