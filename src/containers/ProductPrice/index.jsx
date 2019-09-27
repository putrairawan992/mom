import React from 'react'
import {Card, Row, Col, Tag, Checkbox, Icon} from 'antd';
import Input from '../../components/Input';
import strings from '../../localization';
import { Form } from 'antd';

const ProductPrice = (props) => {

  return(
    <Card className="card" title={<div className="card-title">{strings.product_price}</div>}>
      <Row type="flex" align="middle">
        <Col span={props.grid.left}>
          <Row type="flex">
            <div className="card-content">
              {strings.base_price}
            </div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col span={props.grid.priceRight} className="col-height">
          <Form.Item validateStatus={
            props.errors.basePrice  && props.touched.basePrice?
            "error": "success"
          }>
            <Input
              prefix={"¥"}
              value={props.basePrice}
              style={{width : "100%"}}
              onChange={value => props.handleChange(value,'basePrice',props.setBasePrice)}
              size="large"
              name="basePrice"
            />
              {
                props.errors.basePrice  && props.touched.basePrice? 
                (<div className="text-error-message">{props.errors.basePrice }</div>) :
                null
              }
          </Form.Item>
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle" justify="start">
        <Col md={props.grid.left}>
          <Row type="flex">
            <div className="card-content">
              {strings.domestic_fee}
            </div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Form.Item validateStatus={
            props.errors.domesticFee &&  props.touched.domesticFee ? 
            "error" : "success"
          }>
            <Input
              prefix={"¥"}
              value={props.domesticFee}
              style={{width : "100%"}}
              name="domesticFee"
              onChange={value => {
                props.handleChange(value,'domesticFee',props.setDomesticFee)
              }}
              onBlur={props.handleBlur}
              size="large"
            />
              {
              props.errors.domesticFee &&  props.touched.domesticFee ? 
              (<div className="text-error-message">{props.errors.domesticFee }</div>) : null
            }
          </Form.Item>
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex">
        <Col md={props.grid.left}>
          <Row type ="flex">
            <div className="card-content">
              {strings.shipment_fee}
            </div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={15}>
          <div className="card-sub-content" style={{width: "100%"}}>
            <p>{strings.delivery_fee_quote}</p>
          </div>
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-sub-second-content">
            {strings.by_sea}  
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix={"Rp"}
            value={props.feeBySea}
            name="feeBySea"
            onBlur={props.handleBlur}
            onChange={e => {
              props.handleChange(e,'feeBySea',props.setFeeBySea)
            }}
            size="large"
            status={
              props.errors.feeBySea && props.touched.feeBySea ?
              "error" : "default"
            }
          />
          {
            props.errors.feeBySea && props.touched.feeBySea ? 
            (<div className="text-error-message">{props.errors.feeBySea }</div>) :
            null
          }
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-sub-second-content">
            {strings.by_air}
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix="Rp"
            value={props.feeByAir}
            onBlur={props.handleBlur}
            name="feeByAir"
            onChange={e => {
              props.handleChange(e,'feeByAir',props.setFeeByAir)
            }}
            size="large"
            status={
              props.errors.feeByAir && props.touched.feeByAir ? 
              "error" : "default"
            }
          />
          {
            props.errors.feeByAir && props.touched.feeByAir ? 
            (<div className="text-error-message">{props.errors.feeByAir }</div>) :
            null
          }
        </Col>
      </Row>
      <div className="separator"/>
      <Row>
        <Col md={11} offset={7}>
          <Checkbox >
            <span className="text-safety-orange">
              {strings.shipment_price_reference} <Icon fill="red" type="info-circle"/>
            </span>
          </Checkbox>
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            {strings.administration}
          </div>
        </Col>
        <Col md={props.grid.priceRight} className="col-height">
          <Input
            prefix="Rp"
            value={props.administration}
            onChange={e => {
              props.handleChange(e,'administration',props.setAdministration)
            }}
            size="large"
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            {strings.exchange_rate}
          </div>
        </Col>
        <Col md={3}>
          <Input 
            value="¥ 1"
            size="large"
            disabled
            status="disabled"
          />
        </Col>
        <Col md={1}>
          <div style={{display: "flex",justifyContent: "center"}}>=</div>
        </Col>
        <Col md={8}>
          <Input
            value={props.exchangeRate}
            size="large"
            status="disabled"
            disabled
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            {strings.price_by_sea}
          </div>
        </Col>
        <Col md={props.grid.priceRight}>
          <Input
            value={props.priceBySea}
            size="large"
            status="disabled"
            disabled
          />
        </Col>
      </Row>
      <div className="separator"/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <div className="card-content">
            {strings.price_by_air}
          </div>
        </Col>
        <Col md={props.grid.priceRight}>
          <Input
            value={props.priceByAir}
            size="large"
            disabled
            status="disabled"
          />
        </Col> 
      </Row>
    </Card>
  )
}

export default ProductPrice