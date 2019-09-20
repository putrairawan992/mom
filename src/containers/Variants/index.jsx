import React from "react";
import VariantItems from "./VariantItems";
// import Variant from '../Variant';
import { Card, Form, Input, Row, Col } from "antd";
import Button from '../../components/Button';
import {get} from 'lodash';
import strings from '../../localization'

export default React.memo(function Variants({
  initialValues,
  isOpen,
  openVariants,
  addVariant,
  addVariantItems,
  removeVariant,
  removeVariantItem,
  values,
  errors,
  setFieldValue
}) {
  return (
    <React.Fragment>
      <Card className="card" title={<div className="card-title">{strings.product_variant}</div>} >
        {!isOpen ? (
          <Row>
            <Col span={7}>
              <div className="card-sub-content">
                {strings.add_variant_quote}
              </div>
            </Col>
            <Col span={15}>
              <Button type="grey" onClick={openVariants}>{strings.add_variant_type}</Button>
            </Col>
          </Row> 
        ) : (
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
            {initialValues.variants &&
              Object.keys(initialValues.variants).map(variantId => {
                const variantItems = get(initialValues, `variants.${variantId}.variantItems`);
                const pathVariant = `variants.${variantId}`;
                const pathVariantName = `${pathVariant}.name`;
                return (
                  <React.Fragment key={variantId}>
                    <Card
                      title={strings.variant_type}
                      extra={
                        // <Form.Item
                        //   validateStatus={
                        //     get(errors, pathVariantName) ? "error" : "success"
                        //   }
                        //   help={get(errors, pathVariantName)}
                        // >
                          <Input
                            value={get(values, pathVariantName)}
                            name={pathVariantName}
                            onChange={e => setFieldValue(pathVariantName, e.target.value)}
                          />
                        // </Form.Item> 
                      }
                    >
                      {variantItems.map(item => {
                        return (
                          <VariantItems
                            key={item}
                            item={item}
                            errors={errors}
                            values={values}
                            onChange={(path, value) => setFieldValue(path, value)}
                            onRemove={()=>removeVariantItem(variantId, item)}
                          />
                        );
                      })}
                      <br />
                      <br />
                      <Button onClick={() => addVariantItems(variantId)}>
                        Add Variant Item
                      </Button>
                      <Button onClick={()=>removeVariant(variantId)}>Remove Variant</Button>
                    </Card>
                  </React.Fragment>
                );
              })}
            <br/>
            <Button type="grey" onClick={addVariant} style={{float: "right"}}>{strings.add_variant_type}</Button>
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
})
