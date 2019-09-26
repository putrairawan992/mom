import React from "react";
import VariantItems from "./VariantItems";
// import Variant from '../Variant';
import { Card, Form, Input, Row, Col } from "antd";
import Button from '../../components/Button';
import strings from '../../localization';
import VariantHeader from "../VariantHeader";
import VariantItemContainer from "./VariantItemContainer";
import { getIn } from "formik" ;
import { FieldArray } from 'formik';

export default function Variants({
  isOpen,
  open,
  add,
  variants,
  errors,
  onChange,
  onRemove,
  touched,
  name,
  variantItems
}) {
  return (
    <React.Fragment>
      <Card className="card" title={<div className="card-title">{strings.product_variant}</div>} >
        {
          !isOpen ? (
          <Row>
            <Col span={7}>
              <div className="card-sub-content">
                {strings.add_variant_quote}
              </div>
            </Col>
            <Col span={15}>
              <Button type="grey" onClick={() => open()}>{strings.add_variant_type}</Button>
            </Col>
          </Row> 
        ) :
         (
          <React.Fragment>
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
            </Row>
              <React.Fragment>
                {
                  variants.map((variant, index) => {
                    const pathVariant = `${name}.${index}`
                    const variantName = `${pathVariant}.name`;
                    const variantNameValue = variant.name;
                    const error = getIn(errors, variantName);
                    const touch = getIn(touched, variantName)
                    return (
                      <div key={variant.id} >
                        <Card
                          title={
                            <VariantHeader
                              onChange={(value) =>{
                                onChange(variantName, value)
                              }}
                              name={variantName}
                              value={variantNameValue}
                              error={error}
                              touch={touch}
                              onRemove={ () => {
                                if(variants.length > 1){
                                  onRemove(index)
                                }else{
                                  open()
                                }
                              }}
                            />
                          }
                        >
                          <FieldArray 
                            name={`${pathVariant}.variantItems`}
                            render={helperVariantItem => (
                            <div>
                              <VariantItemContainer
                                variantItems={variant.variantItems} 
                                onRemove={(index) => helperVariantItem.remove(index)}
                                onChange={(name, value) => {onChange(name,value)}}
                                errors={errors}
                                touched={touched}
                                pathVariant={`${pathVariant}.variantItems`}
                              >
                                {(props) =>  <VariantItems
                                  onChange={(name, value) => onChange(name ,value) }
                                {...props} />}
                              </VariantItemContainer>
                            <Button
                              onClick={ () => helperVariantItem.push(variantItems()) }
                            >Add Variant Item</Button>
                          </div>
                            )}
                          />
                        </Card>
                      </div>
                    )
                  })
                }
              </React.Fragment>
            <br/>
            <Button type="grey" onClick={add} style={{float: "right"}}>{strings.add_variant_type}</Button>
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
}
