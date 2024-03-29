import React from "react";
import "./style.css";
import { Row, Col } from "antd";
import Barcode from "react-barcode";
import ic_jne from "../../assets/img/ic_jne.png"

const LabelDetailJne = props => {
  const { order, barcodeNumber, isBarcode } = props;
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
          <Col span={12}>
            <span>Weight(s)</span>
          </Col>
          <Col span={12}>
            <span>Volume(cm)</span>
          </Col>
        </Row>
        <Row className="label-detail-content">
          <Col span={12}>
            <span>1.4</span>
          </Col>
          <Col span={12}>
            <span>30 x 65 x 30</span>
          </Col>
        </Row>
      </div>
      <div className="label-box-bottom">
        <div style={{ padding: "10px" }}>
          <img src={ic_jne} alt="JNE" style={{ height: "24px" }} />
        </div>
        <div>
          {isBarcode ? (
            <Barcode
              value={barcodeNumber}
              width={1.5}
              height={40}
              margin={0}
              fontSize={8}
              fontOption="bold"
            />
          ) : (
            <div style={{paddingTop:"10px"}} >
              <p>No. Resi {barcodeNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabelDetailJne;
