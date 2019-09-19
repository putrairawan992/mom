import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";

export default function VariantsContainer({
  children,
  initialValues,
  updateInitialValues,
  values,
  errors,
  setFieldValue,
  handleChange,
  // onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    if(isOpen){
      initVariants();
    }
  },[isOpen])

  const newVariants = function() {
    const idVariantItem = uuidv4();
    const values = {
      variants: variants(idVariantItem),
      variantItems: variantItems(idVariantItem)
    };
    return values;
  };

  const newVariantItem = function() {
    const idVariantItem = uuidv4();
    const values = {
      id: idVariantItem,
      variantItems: variantItems(idVariantItem)
    };
    return values;
  };

  const variantItems = function(idVariantItem) {
    return {
      [idVariantItem]: {
        name: "",
        image: {}
      }
    };
  };

  const variants = function(idVariantItem) {
    return {
      [uuidv4()]: {
        name: "",
        variantItems: [idVariantItem]
      }
    };
  };

  const openVariants = function() {
    setIsOpen(!isOpen);
  };

  const initVariants = function(){
    const variants = newVariants();
    const tempInitialValues = { ...initialValues, ...variants };
    updateInitialValues(tempInitialValues);
  }

  const addVariant = function() {
    const variants = newVariants();
    let tempInitialValues = { ...initialValues };
    tempInitialValues = {
      ...tempInitialValues,
      variants: { ...tempInitialValues.variants, ...variants.variants },
      variantItems: {
        ...tempInitialValues.variantItems,
        ...variants.variantItems
      }
    };
    updateInitialValues(tempInitialValues);
  };

  const addVariantItems = function(id) {
    const variants = newVariantItem();
    let tempInitialValues = {
      ...initialValues,
      variants: {
        ...initialValues.variants,
        [id]: {
          ...initialValues.variants[id],
          variantItems: [
            ...initialValues.variants[id].variantItems,
            variants.id
          ]
        }
      },
      variantItems: {
        ...initialValues.variantItems,
        ...variants.variantItems
      }
    };
    updateInitialValues(tempInitialValues);
  };

  const onChange = function(key, value) {
    const splitKeys = key.split(".");
    const variant = splitKeys[0];
    const id = splitKeys[1];
    const name = splitKeys[2];
    let tempValues = { ...initialValues };
    tempValues = {
      ...tempValues,
      [variant]: {
        ...tempValues[variant],
        [id]: { ...tempValues[variant][id], [name]: value }
      }
    };
    updateInitialValues(tempValues);
  };

  return (
    <React.Fragment>
      {children({
        initialValues,
        openVariants,
        addVariant,
        addVariantItems,
        isOpen,
        values,
        errors,
        setFieldValue,
        handleChange,
        onChange,
      })}
    </React.Fragment>
  );
}
