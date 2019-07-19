import React,{useState} from 'react'
import {Card, Row, Col, Switch, Tag } from 'antd'
import Input from '../../components/Input'

const StockManagement = (props) => {
  const [readyStock, setReadyStock] = useState(true)

  const handleChange = (value) => {
    setReadyStock(!readyStock)
    props.setFieldValue('readyStock', value)
  }

  return (
    <Card className="card" title={
      <div style={{display: "flex"}}>
        <div className="card-title">Stock Management</div>
        <Tag className="tag">Required</Tag>
      </div>
    }>
      <Row  type="flex" justify="start" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">Maximum Qty / Order</div>
        </Col>
        <Col md={8}>
          <Input
            placeholder="Quantity"
            size="large"
            name="quantity"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            type="number"
          />
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="space-between">
        <Col>
          <div className="card-content">Ready Stock</div>
          <div className="card-sub-content">Turn on the switch if the stock is ready</div>
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