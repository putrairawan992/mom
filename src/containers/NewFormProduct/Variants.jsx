import React from "react";
import VariantItems from "./VariantItems";
import { Card, Input } from "antd";

export default function Variants({
  initialValues,
  isOpen,
  openVariants,
  addVariant,
  addVariantItems,
  values,
  errors,
  touched,
  setFieldValue
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
                const variant = initialValues.variants[variantId];
                const pathVariant = `variants.${variantId}`;
                return (
                  <React.Fragment key={variantId}>
                    <Card
                      title="variant Type"
                      extra={<Input placeholder="type variant" name={`${pathVariant}.name`} />}
                    >
                      <VariantItems
                        pathVariant ={pathVariant}
                        variant={variant}
                        addVariantItems={() => {
                          addVariantItems(variantId);
                        }}
                      />
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
}
