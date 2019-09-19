import React from "react";
import VariantItems from "./VariantItems";
import { Card, Form, Input, Button } from "antd";
import {get} from 'lodash';

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
      <Card>
        {!isOpen ? (
          <Button onClick={openVariants}>Open</Button>
        ) : (
          <React.Fragment>
            {initialValues.variants &&
              Object.keys(initialValues.variants).map(variantId => {
                const variantItems = get(initialValues, `variants.${variantId}.variantItems`);
                const pathVariant = `variants.${variantId}`;
                const pathVariantName = `${pathVariant}.name`;
                return (
                  <React.Fragment key={variantId}>
                    <Card
                      title="variant Type"
                      extra={
                        <Form.Item
                          validateStatus={
                            get(errors, pathVariantName) ? "error" : "success"
                          }
                          help={get(errors, pathVariantName)}
                        >
                          <Input
                            value={get(values, pathVariantName)}
                            name={pathVariantName}
                            onChange={e => setFieldValue(pathVariantName, e.target.value)}
                          />
                        </Form.Item>
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
            <Button onClick={addVariant}>Add Variant</Button>
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
})
