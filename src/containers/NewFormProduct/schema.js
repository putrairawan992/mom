import * as Yup from 'yup';
import strings from '../../localization';
import mapValues from "lodash/mapValues";

export const schema = Yup.object().shape({
  variants: Yup.lazy(obj=>{
    Yup.object(
      mapValues(obj, ()=>{
        console.log(obj)
        return Yup.object().shape({
          name : Yup.string().required(),
          variantItem: Yup.lazy(obj=>{
            mapValues(obj, ()=>
            Yup.object().shape({
              name: Yup.string().required(),
              image: Yup.object().required()
            })
          )})
        })}
      )
    )
  })
});