import React from 'react';
import uuid4 from "uuid";

export default function VariantItemContainer ({
  children,
  variantItems,
  push,
  onRemove,
  errors,
  touched,
  pathVariant,
}){

  const add = function () {
    push(items())
  }

  const items = function() {
    return {
        name: "",
        id : uuid4(),  
        image : {}
    };
  };

  return (
    <React.Fragment>
      {children({
        variantItems,
        pathVariant,
        push,
        onRemove,
        errors,
        touched,
        add
      })}
    </React.Fragment>
  )
}