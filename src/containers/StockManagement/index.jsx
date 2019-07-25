import React,{useState} from 'react'
import {Card, Row, Col, Switch, Tag } from 'antd'
import Input from '../../components/Input'
import strings from '../../localization'

const StockManagement = (props) => {
  const [readyStock, setReadyStock] = useState(true)

  const handleChange = (value) => {
    setReadyStock(!readyStock)
    props.setFieldValue('readyStock', value)
  }

  return (
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
  )
}

export default StockManagement