import React, { useState } from "react";
import uuidv4 from "uuid/v4";

export default function VariantsContainer({
  children,
  initialValues,
  updateInitialValues,
  values,
  errors,
  touched,
  setFieldValue
}) {
  const [isOpen, setIsOpen] = useState(false);

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
    const variants = newVariants();
    let tempInitialValues = { ...initialValues };
    tempInitialValues = { ...tempInitialValues, ...variants };
    updateInitialValues(tempInitialValues);
  };

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
        touched,
        setFieldValue
      })}
    </React.Fragment>
  );
}
