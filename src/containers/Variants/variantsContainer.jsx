import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";
import { omit, pull } from "lodash";

export default function VariantsContainer({
  children,
  initialValues,
  updateInitialValues,
  values,
  errors,
  setFieldValue
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      initVariants();
    }
  }, [isOpen]);

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

  const initVariants = function() {
    const variants = newVariants();
    const tempInitialValues = { ...initialValues, ...variants };
    updateInitialValues(tempInitialValues);
  };

  const addVariant = function() {
    const variants = newVariants();
    let tempInitialValues = { ...values };
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

  const removeVariantItems = function(items, variantItems) {
    let tempVariantItems = { ...variantItems };
    items.forEach(id => {
      tempVariantItems = omit(variantItems, [id]);
    });
    return tempVariantItems;
  };

  const removeVariant = function(id) {
    let tempInitialValues = { ...values };
    console.log("=====",tempInitialValues.variants)
    const newVariants = omit(tempInitialValues.variants, [id]);
    const newVariantItems = removeVariantItems(
      tempInitialValues.variants[id].variantItems,
      tempInitialValues.variantItems
    );
    tempInitialValues = {
      ...tempInitialValues,
      variants: { ...newVariants },
      variantItems: { ...newVariantItems }
    };
    updateInitialValues(tempInitialValues);
  };

  const addVariantItems = function(id) {
    const variants = newVariantItem();
    let tempInitialValues = { ...values };
    tempInitialValues = {
      ...tempInitialValues,
      variants: {
        ...tempInitialValues.variants,
        [id]: {
          ...tempInitialValues.variants[id],
          variantItems: [
            ...tempInitialValues.variants[id].variantItems,
            variants.id
          ]
        }
      },
      variantItems: {
        ...tempInitialValues.variantItems,
        ...variants.variantItems
      }
    };
    updateInitialValues(tempInitialValues);
  };

  const removeVariantItemsFromVariant = function(
    variants,
    idVariant,
    idVariantItem
  ) {
    let tempVariants = variants;
    pull(variants[idVariant].variantItems, idVariantItem);
    return tempVariants;
  };

  const removeVariantItem = function(idVariant, idVariantItem) {
    let tempInitialValues = { ...values };
    const newVariantItems = omit(tempInitialValues.variantItems, [idVariantItem]);
    const newVariants = removeVariantItemsFromVariant(
      tempInitialValues.variants,
      idVariant,
      idVariantItem
    );
    tempInitialValues = {
      ...tempInitialValues,
      variants: { ...tempInitialValues.variants, ...newVariants },
      variantItems: { ...tempInitialValues.variantItems, ...newVariantItems }
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
        removeVariant,
        removeVariantItem,
        isOpen,
        values,
        errors,
        setFieldValue
      })}
    </React.Fragment>
  );
}
