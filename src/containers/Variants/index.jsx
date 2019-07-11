import React from 'react';
import { Card, Row, Col } from 'antd';
import Button from '../../components/Button';
import Variant from '../Variant'
import './style.sass'

const Variants = (props) => {
  return(
    <Card title="Product Variant">
    {
      !props.statusVariant ?
      <Row>
        <Col span={6}>
          Add variant for the product such as colors, size, materials etc.
        </Col>
        <Col span={18}>
          <Button onClick={() => props.addVariant()}>Add Variant Type</Button>
        </Col>
      </Row> :
       <Row>
       For better visual and performance we recomended that the images should be not out of this requirement
       <ul>
         <li>
           Max Img Size 3 MB
         </li>
         <li>
           Min Frame Size 300px X 300px
         </li>
         <li>
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
        <Button onClick={() => props.addVariant()} style={{float: "right"}}>Add Variant Type</Button>
      }
      </Row>
    }
    </Card>
  )
}

export default Variants