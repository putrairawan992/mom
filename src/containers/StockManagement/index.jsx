import React,{useState} from 'react'
import {Card, Row, Col, Switch, Tag } from 'antd'
import Input from '../../components/Input'
import strings from '../../localization'
import { Form } from 'antd'

const StockManagement = (props) => {
  const [readyStock, setReadyStock] = useState(true)

  const handleChange = (value) => {
    setReadyStock(!readyStock)
    props.setFieldValue('readyStock', value)
  }

  return (
    <Form.Item 
      validateStatus={
        ( typeof props.errors.quantity === 'string' && props.touched.quantity) ? 
        "error" : 'success'
      }
    >
    <Card className="card" title={
      <div style={{display: "flex"}}>
        <div className="card-title">{strings.stock_management}</div>
        <Tag className="tag">{strings.required}</Tag>
      </div>
    }>
      <Row  type="flex" justify="start" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">{strings.max_qty}</div>
        </Col>
        <Col md={8}>
          <Input
            placeholder="Quantity"
            size="large"
            name="quantity"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            type="number"
            value={props.values.quantity}
          />
          {
            ( typeof props.errors.quantity === 'string' && props.touched.quantity) ? 
             <div className="text-error-message">{props.errors.quantity}</div> : null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="space-between">
        <Col>
          <div className="card-content">{strings.ready_stock}</div>
          <div className="card-sub-content">{strings.stock_ready_qoute}</div>
        </Col>
        <Col>
          <Switch
            defaultChecked={readyStock}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Card>
    </Form.Item>
  )
}

export default StockManagement