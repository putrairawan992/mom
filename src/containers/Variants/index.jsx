import React from 'react';
import { Card, Row, Col } from 'antd';
import Button from '../../components/Button';
import Variant from '../Variant'
import './style.sass'

const Variants = (props) => {
  return(
    <Card className="card" title={<div className="card-title">Product Variant</div>}>
    {
      !props.statusVariant ?
      <Row>
        <Col span={7}>
          <div className="card-sub-content">
            Add variant for the product such as colors, size, materials etc.
          </div>
        </Col>
        <Col span={15}>
          <Button type="grey" onClick={() => props.addVariant()}>Add Variant Type</Button>
        </Col>
      </Row> :
       <Row>
        <div className="card-tittle-content"> 
          For better visual and performance we recomended that the images should be not out of this requirement
        </div>
       <ul>
          <li className="card-tittle-content">
            Max Img Size 3 MB
          </li>
          <li className="card-tittle-content">
            Min Frame Size 300px X 300px
          </li>
          <li className="card-tittle-content">
            Format jpg, jpeg, png
         </li>
      </ul>
      {
        props.totalVariants.map((variant,index) => {
          return (
            <div key={index}>
              <Variant
                cancelVariant={props.cancelVariant}
                handleBlur={props.handleBlur}
                index={index}
                handleChange={props.handleChange}
                errors={props.errors}
                errorVariant={props.errorVariant}
                values={props.values}
                variant={variant}
                addVariantItems={props.addVariantItems}
                setFieldValue={props.setFieldValue}
                removeVariantItems={props.removeVariantItems}
              />
              <br/>
            </div>
          )
        })
      }
      {
      props.totalVariants.length === 1 &&
        <Button type="grey" onClick={() => props.addVariant()} style={{float: "right"}}>Add Variant Type</Button>
      }
      </Row>
    }
    </Card>
  )
}

export default Variants