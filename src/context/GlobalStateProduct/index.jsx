import React,{useState} from 'react';
import ProductContext from './product-context';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';

const GlobalStateProduct = props => {
  const [status,setStatus] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialValues,setInitialValues] = useState({
    administration: "",
    actualWeight: "",
    variants: [],
    listImages: [],
    supplier: "",
    basePrice: "",
    domesticFee: "",
    feeBySea: "",
    feeByAir: "",
    productNameOriginal: "",
    productName: "",
    category: [],
    description: "",
    width: "",
    length: "",
    height: "",
    rate: "",
    readyStock: true,
    quantity: "",
  })

  const getProductById = async() => {
    setLoading(true)
    try {
      const response = await apiGetWithoutToken(PATH_PRODUCT.GET_BY_ID + '6122e98c-743a-4280-ad15-40fe3c9891af',)
      const respponseProduct = response.data.data
      setInitialValuesWithResponse(respponseProduct)
      setLoading(false)
      setStatus(false)
    } catch (error) {
      clearStateInitialValues()
      setStatus(true)
      setLoading(false)
    }
  }

  const clearStateInitialValues = () => {
    setInitialValues({
      ...initialValues
    })
  }

  const setInitialValuesWithResponse = (responseProduct) => {
    const {information} = responseProduct
      setInitialValues({
        ...initialValues ,
        productNameOriginal : information.nameChinese,
        productName: information.name,
        description: information.description,
        category: [...initialValues.category, information.id],
        listImages: [...initialValues.listImages, responseProduct.images],
        variants: responseProduct.variants,
        actualWeight: information.measurement.weight,
        height: information.measurement.dimension.height,
        width: information.measurement.dimension.width,
        length: information.measurement.dimension.length,
        quantity: information.maxOrder
      })
  }

  return (
    <ProductContext.Provider
      value={{
        getProductById: getProductById,
        initialValues: initialValues,
        status: status,
        loading: loading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )

}

export default GlobalStateProduct
