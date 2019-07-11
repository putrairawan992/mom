import React from "react";
import { Row, Col } from "antd";

const LabelContent = props => {
  const { label, content, styleRow, styleLabel, styleContent } = props;
  return (
    <Row className={styleRow}>
      <Col span={4}>
        <span className={styleLabel}>{label}</span>
      </Col>
      <Col span={1}>
        <span>:</span>
      </Col>
      <Col span={19}>
        <span className={styleContent}>{content}</span>
      </Col>
    </Row>
  );
};

export default LabelContent;
