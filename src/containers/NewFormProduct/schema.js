import * as Yup from "yup";
import strings from "../../localization";
import mapValues from "lodash/mapValues";

export const schema = Yup.object().shape({
  product: Yup.string().required(),
  variants: Yup.lazy(obj =>
    Yup.object(
      mapValues(obj, () =>{
        console.log("variant", obj)
        return Yup.object().shape({
          name: Yup.string().required(),
          // variantItems: Yup.lazy(obj =>
          //   mapValues(obj, () =>{
          //     console.log("variantItem", obj)
          //     return Yup.object().shape({
          //       name: Yup.string().required(),
          //       image: Yup.object().required()
          //     })}
          //   )
          // )
        })}
      )
    ).required("Must be filled")
  )
});
