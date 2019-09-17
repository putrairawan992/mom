import React from "react";

export default function VariantItems({ variant, addVariantItems }) {
  return (
    <React.Fragment>
      {variant &&
        Object.keys(variant.variantItems).map(itemId => {
          const variantItems = variant.variantItems[itemId];
          return (
            <React.Fragment key={itemId}>
              <ul>
                <li>variantItems</li>
              </ul>
            </React.Fragment>
          );
        })}
      <button onClick={addVariantItems}>Add Variant Item</button>
    </React.Fragment>
  );
}
