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
  const variantItems = {
    [uuidv4()]: {
      name: "",
      image: {}
    }
  };
  const variants = {
    [uuidv4()]: {
      name: "",
      variantItems: { ...variantItems }
    }
  };
  const openVariants = function() {
    setIsOpen(!isOpen);
    let tempInitialValues = { ...initialValues };
    tempInitialValues = { ...tempInitialValues, variants: { ...variants } };
    updateInitialValues(tempInitialValues);
  };

  const addVariant = function() {
    let tempInitialValues = { ...initialValues };
    tempInitialValues = {
      ...tempInitialValues,
      variants: { ...tempInitialValues.variants, ...variants }
    };
    updateInitialValues(tempInitialValues);
  };

  const addVariantItems = function(id) {
    let tempInitialValues = {
      ...initialValues,
      variants: {
        ...initialValues.variants,
        [id]: {
          ...initialValues.variants[id],
          variantItems: {
            ...initialValues.variants[id].variantItems,
            ...variantItems
          }
        }
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
