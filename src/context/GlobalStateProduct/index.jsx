import React,{useState} from 'react';
import ProductContext from './product-context';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import {PATH_CATEGORY} from '../../services/path/category';


const GlobalStateProduct = props => {
  const [status,setStatus] = useState(true)
  const [loading, setLoading] = useState(false)
  const [statusVariant, setStatusVariant] = useState(false)
  const [labelButton, setLabelButton] = useState("")
  const [category, setCategory] = useState([])
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
  const string = {
    name : "",
    variantItems : [{
      name : "",
      image: {}
    }]
  }

  const stringVariantType = {
    name : "",
    image: {}
  }

  const openVariant = () => {
    setStatusVariant(true)
    setInitialValues({
      ...initialValues, variants : [...initialValues.variants, string]
    })
  }

  const cancelVariant = (values,index) => {
    if(values.length === 1){
      setStatusVariant(false)
      setInitialValues({
        ...initialValues, variants : []
      })
    }else{
      values.splice(index,1)
      setInitialValues({
        ...initialValues, variants : values
      })
    }
  }

  const addVariantItems = (errors,i,values) => {
    if(!errors.variants){
      const tempValues = values.map((value,index) =>{
        if(i === index){
          return {...value, variantItems: [...value.variantItems,stringVariantType]}
        }else{
          return {...value}
        }
      })
      setInitialValues({
        ...initialValues, variants : tempValues
      })
    }
  }

  const removeVariantItems = (indexType,indexVariant,values) => {
    const tempInitial = [...values]
    tempInitial.forEach((variant,i) => {
      if(indexVariant === i){
        variant.variantItems.splice(indexType,1)
      }
    })
    setInitialValues({
      ...initialValues, variants : tempInitial
    })
  }

  const getProductById = async() => {
    setLoading(true)
    // let id = 'e7cc606c-6000-4752-b4d3-4c9655f045ff'
    let id = 'd6d3e63f-6f66-4486-936a-5e26a25f8ed2'
    try {
      const response = await apiGetWithoutToken(PATH_PRODUCT.GET_BY_ID + id,)
      const respponseProduct = response.data.data
      setInitialValuesWithResponse(respponseProduct)
      setLoading(false)
      setStatus(false)
      setStatusVariant(true)
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
        category: information.category,
        listImages:  responseProduct.images,
        variants: responseProduct.variants,
        actualWeight: information.measurement.weight,
        height: information.measurement.dimension.height,
        width: information.measurement.dimension.width,
        length: information.measurement.dimension.length,
        quantity: information.maxOrder
      })
  }

  const toFormCreate = () => {
    setStatus(false)
    setLabelButton("Add Product")
  }

  const addProduct = (values, images) => {
    let dimension = {}
      dimension.width = values.width
      dimension.length = values.length
      dimension.height = values.height
    let measurement = {}
      measurement.weight = values.actualWeight
      measurement.dimension = dimension
    let category = {}
      category.id = values.category[values.category.length -1]
    let information = {}
      information.name = values.productName
      information.nameChinese = values.productNameOriginal
      information.description = values.description
      information.category = category
      information.measurement = measurement
      information.maxOrder = values.quantity
    let basePrice = {}
      basePrice.cny = values.basePrice
    let shipmentFee = {}
      shipmentFee.air = values.feeByAir
      shipmentFee.sea = values.feeBySea
    let fee = {}
      if(values.administration === ""){
        fee.administration = 0
      }else{
        fee.administration = values.administration
      }
      fee.domestic = values.domesticFee
      fee.shipmentFee = shipmentFee
    let price = {}
      price.rate = values.rate.value
      price.fee = fee
      price.basePrice = basePrice
    let supplier = {}
      supplier.id = values.supplier
    let allDataProduct = {}
      allDataProduct.information = information
      allDataProduct.supplier = supplier
      allDataProduct.price = price
      allDataProduct.isReadyStock = values.readyStock
      allDataProduct.isActive = true
      allDataProduct.images = images
      allDataProduct.variants = values.variants
      console.log("payload",allDataProduct)
      // setAllProduct(allDataProduct)
    //TODO fungsi post product
      // try {
      //   const request = await apiPostWithToken(PATH_PRODUCT.CREATE, allDataProduct)
      //   message.success(request.data.code)
      // } catch (error) {
      //   console.log(error.response)
      //   openNotificationWithIcon('error', error.response)
      // }
  }

  return (
    <ProductContext.Provider
      value={{
        getProductById: getProductById,
        initialValues: initialValues,
        status: status,
        loading: loading,
        toFormCreate: toFormCreate,
        statusVariant: statusVariant,
        openVariant: openVariant,
        cancelVariant: cancelVariant,
        addVariantItems: addVariantItems,
        labelButton: labelButton,
        removeVariantItems: removeVariantItems,
        addProduct: addProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )

}

export default GlobalStateProduct
