import React from 'react';
import { Form, Row, Col } from 'antd';
import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types"

export default function VariantHeader ({
  name, 
  value, 
  onChange, 
  error,
  touch,
  onRemove,
}) {
  return (
    <React.Fragment>
      <Row type="flex" align="middle" justify="center" >
        <Col span={4}>
          Variant Type
        </Col>
        <Col span={16}>
          <Form.Item
            validateStatus={ (error && touch) && "error" }
            help={ (error && touch) && error }
          >
          </Form.Item>
          <Input
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={onRemove}
          >Close</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

VariantHeader.propTypes = {
  name : PropTypes.string,
  value : PropTypes.string,
  onChange : PropTypes.func,
  onRemove : PropTypes.func,
  error : PropTypes.string,
  touch : PropTypes.bool
}

VariantHeader.defaultProps = {
  name : "",
  value : "",
  error : null,
  touch : null
}