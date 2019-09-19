import React from "react";
import VariantItems from "./VariantItems";
import { Card, Form, Input } from "antd";
import {get} from 'lodash';

export default React.memo(function Variants({
  initialValues,
  isOpen,
  openVariants,
  addVariant,
  addVariantItems,
  onChange,
  values,
  errors
}) {
  return (
    <React.Fragment>
      <Card>
        {!isOpen ? (
          <button onClick={openVariants}>Open</button>
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
                            onChange={e => onChange(pathVariantName, e.target.value)}
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
                            onChange={onChange}
                          />
                        );
                      })}
                      <br />
                      <br />
                      <button onClick={() => addVariantItems(variantId)}>
                        Add Variant Item
                      </button>
                    </Card>
                  </React.Fragment>
                );
              })}
            <button onClick={addVariant}>Add Variant</button>
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
})
