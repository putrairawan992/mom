import React from "react";
import uuid4 from "uuid";
import Variants from "../../containers/Variants";

export default function VariantsContainer({
  push,
  variants,
  onChange,
  onRemove,
  name,
  touched,
  errors,
  open,
  openVariant
}) {
  
  const variantItems = function() {
    return {
        name: "",
        id : uuid4(),  
        image : {}
    };
  };

  const newVariants = function() {
    return {
        name: "",
        id : uuid4(),
        variantItems: [variantItems()]
      };
  };

  const add = function() {
    push(newVariants())
  };

  return (
    <Variants 
      add={add}
      variants={variants}
      open={open}
      onChange={onChange}
      errors={errors}
      touched={touched}
      name={name}
      onRemove={onRemove}
      variantItems={variantItems}
      isOpen={openVariant}
    />
  );
}
