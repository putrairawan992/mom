import React from 'react';
import { Card, Row, Col } from 'antd';
import Button from '../../components/Button';
import Variant from '../Variant';
import strings from '../../localization'
import './style.sass'

const Variants = (props) => {
  return(
    <Card className="card" title={<div className="card-title">{strings.product_variant}</div>}>
    {
      !props.statusVariant ? 
      <Row>
        <Col span={7}>
          <div className="card-sub-content">
            {strings.add_variant_quote}
          </div>
        </Col>
        <Col span={15}>
          <Button type="grey" onClick={() => props.openVariant()}>{strings.add_variant_type}</Button>
        </Col>
      </Row> :
       <Row>
        <div className="card-tittle-content"> 
          {strings.product_variant_qoute}
        </div>
       <ul style={{margin: 0, padding: 0, listStyleType: "none"}}>
          <li className="card-tittle-content">
            {strings.max_image_size}
          </li>
          <li className="card-tittle-content">
            {strings.min_frame}
          </li>
          <li className="card-tittle-content">
            {strings.format_image}
         </li>
      </ul><br/>
      {
        props.values.map((variant,index) => {
          return (
            <div key={index}>
              <Variant
                cancelVariant={props.cancelVariant}
                handleBlur={props.handleBlur}
                index={index}
                handleChange={props.handleChange}
                errors={props.errors}
                values={props.values}
                variant={variant}
                addVariantItems={props.addVariantItems}
                setFieldValue={props.setFieldValue}
                removeVariantItems={props.removeVariantItems}
                touched={props.touched}
                onReset={props.onReset}
              />
              <br/>
            </div>
          )
        })
      }
      {
      props.values.length === 1 &&
        <Button type="grey" onClick={() => props.addVariant(props.values)} style={{float: "right"}}>{strings.add_variant_type}</Button>
      }
      </Row>
    }
    </Card>
  )
}

export default Variants