import React, { useState } from "react";
import uuid4 from "uuid";

export default function VariantsContainer({
  children,
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
  const [isOpen, setIsOpen] = useState(false);

  // const open = function() {
  //   setIsOpen(!isOpen);
  // };
  
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
    <React.Fragment>
      {children({
        add,
        variants,
        open,
        onChange,
        errors,
        touched,
        name,
        onRemove,
        variantItems,
        isOpen : openVariant
      })}
    </React.Fragment>
  );
}
