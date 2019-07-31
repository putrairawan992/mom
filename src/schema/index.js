import * as Yup from 'yup';
import strings from '../localization';

export const schemaProduct = Yup.object().shape({
  variants: Yup.array(Yup.object().shape({
    // name: Yup.string().required(),
    variantItems: Yup.array().of(Yup.object().shape({
      name: Yup.string().required(strings.variant_item_error)
    }))
  })),
  supplier: Yup.string().required(strings.supplier_error).nullable(),
  productNameOriginal: Yup.string().required(strings.product_error),
  productName:  Yup.string().required(strings.product_error),
  category: Yup.string().required(strings.category_error),
  basePrice: Yup.string().required(strings.base_price_error).nullable(),
  domesticFee: Yup.string().required(strings.domestic_error),
  feeBySea: Yup.string().required(strings.shipment_sea_error),
  feeByAir: Yup.string().required(strings.shimpet_air_error),
  listImages:Yup.array().required(strings.upload_image_error),
  width: Yup.string().required(),
  length: Yup.string().required(),
  height: Yup.string().required(),
  actualWeight: Yup.string().required(strings.actual_weight_error),
  quantity: Yup.string().required(strings.quantity_error)
});