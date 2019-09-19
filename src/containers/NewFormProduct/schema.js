import * as Yup from "yup";
import strings from "../../localization";
import mapValues from "lodash/mapValues";

export const schema = Yup.object().shape({
  product: Yup.string().required(),
  variants: Yup.lazy(obj =>
    Yup.object(
      mapValues(obj, () => {
        return Yup.object().shape({
          name: Yup.string().required("Variant mesti di isi"),
          variantItems: Yup.array().required()
        });
      })
    )
  ),
  variantItems: Yup.lazy(obj =>
    Yup.object(
      mapValues(obj, () => {
        return Yup.object().shape({
          name: Yup.string().required('variant items'),
          image: Yup.object().required()
        });
      })
    )
  )
});
