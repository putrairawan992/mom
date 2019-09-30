import React from 'react';
import Cascader from '../../components/Cascader';
import {Card, Row, Col, Tag, Form} from 'antd';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import strings from '../../localization';

export default function ProductInfo(props) {

  return(
    <Card className="card" title={<div className="card-title">{strings.product_information}</div>}>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.product_name_cny}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
          <div className="card-sub-content">{strings.product_cny_quote}</div>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Form.Item
            validateStatus={ props.errors.productNameOriginal && props.touched.productNameOriginal ? "error" : "success"}
            help={ props.errors.productNameOriginal && props.touched.productNameOriginal ?  props.errors.productNameOriginal : null }
          >
            <Input
              name="productNameOriginal"
              value={props.values.productNameOriginal}
              onChange={event => props.onChange( event.target.name ,event.target.value)}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.product_name}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
          <div className="card-sub-content">
            {strings.product_name_quote}
          </div>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Form.Item
            validateStatus={ props.errors.productName && props.touched.productName ? "error" : "success" }
            help={ props.errors.productName && props.touched.productName ? props.errors.productName : null }
          >
            <Input
              name="productName"
              onChange={event => props.onChange( event.target.name ,event.target.value)}
              value={props.values.productName}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
      <br/>
      <Row type="flex">
        <Col md={props.grid.left}>
          <div className="card-content">{strings.product_description}</div>
          <div className="card-sub-content">
            {strings.product_description_quote}
          </div>
        </Col>
        <Col md={props.grid.right}>
          <TextArea
            name="description"
            autosize={{ minRows: 6, maxRows: 6}}
            maxLength={2000}
            value={props.values.description}
            onChange={event => props.onChange( event.target.name ,event.target.value)}
          />
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.category}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Form.Item
            validateStatus={ props.errors.category && props.touched.category? "error" : "success" }
            help={ props.errors.category && props.touched.category ? props.errors.category : null  }
          >
            <Cascader
              options={props.allCategory}
              fieldNames={{label: 'name', value :'id'}}
              expandTrigger="hover"
              name="category"
              placeholder="Choose Category"
              onChange={value =>{
                props.onChange( 'category' ,value)
              }}
              value={props.values.category}
              showSearch={props.filter}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}