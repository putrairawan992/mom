import React from 'react';
import {Card, Row, Col } from 'antd';
import Input from '../../components/Input';
import strings from '../../localization';

const VideoProduct = (props) => {
  return (
    <Card className="card" title={
      <div style={{display: "flex"}}>
        <div className="card-title">{strings.product_video}</div>
      </div>
    }>
      <Row  type="flex" justify="start" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">{strings.video_url}</div>
        </Col>
        <Col md={props.grid.right}>
          <Input
            placeholder="http://www.youtube.com"
            style={{width : "100%"}}
            size="large"
            name="videoUrl"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.videoUrl}
          />
          {
            (typeof props.errors.videoUrl === 'string') ? 
             <div className="text-error-message">{props.errors.videoUrl}</div> : null
          }
        </Col>
      </Row>
    </Card>
  )
}

export default VideoProduct;