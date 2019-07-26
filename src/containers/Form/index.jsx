import React, { useState, useEffect, useContext} from 'react';
import UploadImages from '../../containers/UploadImages';
import Variants from '../../containers/Variants';
import { Formik } from 'formik';
import { Form, Input } from 'antd';
import Button from '../../components/Button';
import * as Yup from 'yup';
import ProductPrice from '../../containers/ProductPrice';
import ProductInfo from '../../containers/ProductInfo';
import Supplier from '../../containers/AllSupplier';
import {message, notification} from 'antd';
import Measurement from '../../containers/Measurement';
import StockManagement from '../../containers/StockManagement';
import {apiPostWithToken} from '../../services/api'
import {PATH_PRODUCT} from '../../services/path/product';
import strings from '../../localization';
import ProductContext from '../../context/GlobalStateProduct/product-context'
import './style.sass';

const schema = Yup.object().shape({
  variants: Yup.array(Yup.object().shape({
    // name: Yup.string().required(),
    variantItems: Yup.array().of(Yup.object().shape({
      name: Yup.string().required(strings.variant_item_error)
    }))
  })),
  // supplier: Yup.string().required(strings.supplier_error).nullable(),
  // productNameOriginal: Yup.string().required(strings.product_error),
  // productName:  Yup.string().required(strings.product_error),
  // category: Yup.string().required(strings.category_error),
  // basePrice: Yup.string().required(strings.base_price_error),
  // domesticFee: Yup.string().required(strings.domestic_error),
  // feeBySea: Yup.string().required(strings.shipment_sea_error),
  // feeByAir: Yup.string().required(strings.shimpet_air_error),
  // listImages:Yup.array().required(strings.upload_image_error),
  // width: Yup.string().required(),
  // length: Yup.string().required(),
  // height: Yup.string().required(),
  // actualWeight: Yup.string().required(strings.actual_weight_error),
  // quantity: Yup.string().required(strings.quantity_error)
});

const FormProduct = (props) => {
  const context = useContext(ProductContext)
  const [payloadImage, setPayloadImage] = useState([])
  const [totalVariants, setTotalVariants] = useState([])
  const [allProduct, setAllProduct] = useState({})
  const [string] = useState({
    name : "",
    variantItems : [{
      name : "",
      image: {}
    }]
  })
  const [statusVariant, setStatusVariant] = useState(false)
  const stringVariantType = {
    name : "",
    image: {}
  }
  const grid = {
    left : 7,
    right: 17,
    priceRight: 12
  }
  const [initialValues ,setInitialValues] = useState({
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

  const openVariant = () => {
    setStatusVariant(true)
    console.log("initial variant",initialValues.variants)
    if(initialValues.variants.length > 0){
      console.log("mask if open")
      
    }else{
      setInitialValues({
        ...initialValues, variants : [...initialValues.variants,string]
      })
    }
  }

  const addVariant = (values) => {
    setInitialValues({
      ...initialValues, variants : [...initialValues.variants,string]
    })
  }

  const cancelVariant = (values,index,key) => {
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

  useEffect(() => {
    setTotalVariants(totalVariants)
  },[totalVariants])

  useEffect(() => {
    if(props.dataProduct){
      setAllProduct(props.dataProduct)
      const {information} = props.dataProduct
      setInitialValues({
        ...initialValues ,
        productNameOriginal : information.nameChinese,
        productName: information.name,
        description: information.description,
        category: [...initialValues.category, information.id],
        listImages: [...initialValues.listImages, props.dataProduct.images],
        variants: props.dataProduct.variants,
        actualWeight: information.measurement.weight,
        height: information.measurement.dimension.height,
        width: information.measurement.dimension.width,
        length: information.measurement.dimension.length,
        quantity: information.maxOrder
      })
      setTotalVariants(props.dataProduct.variants)
    }
  },[])

  useEffect(() => {
    if(props.dataProduct){
      const responseVariants = props.dataProduct.variants
      setTotalVariants(responseVariants)
      setStatusVariant(true)
    }
  })

  const getPayloadImage = (dataImage) => {
    setPayloadImage(dataImage)
  }

  const handleSubmit = async(values) => { 
    console.log("values",values)
    const images = payloadImage.filter(image => {
      return image.largeUrl
    })
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

  const openNotificationWithIcon = (type,error) => {
    notification[type]({
      message: error.data.error,
      duration: 0,
      description:
        `status: ${error.data.status} \xA0
        ${error.data.message}
        `,
    });
  };
  
  

  return (
    <div className="containerProduct">
      <p className="title-page">
        {strings.create_product}
      </p>
      <Formik
          initialValues={context.initialValues}
          enableReinitialize
          onSubmit={values => {
            handleSubmit(values)
            
          }}
          // validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            handleReset,
            onReset
          }) => (
            <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Supplier
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                grid={grid}
                dataProduct={props.dataProduct}
              />
            </Form.Item>
            <Form.Item>
              <ProductInfo
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
                values={values}
                grid={grid}
                dataProduct={props.dataProduct}
              />
            </Form.Item>
            <Form.Item>
              <UploadImages
                maxImage={5}
                getPayloadImage={getPayloadImage}
                setFieldValue={setFieldValue}
                errors={errors}  
                handleBlur={handleBlur}
                touched={touched}
                dataProduct={props.dataProduct}
              />
            </Form.Item>
            <Form.Item>
              <ProductPrice
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
                handleBlur={handleBlur}
                grid={grid}
              />
             
            </Form.Item>
            <Form.Item>
              <Variants
                dataProduct={props.dataProduct}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                errors={errors}
                addVariant={addVariant}
                handleBlur={handleBlur}
                values={values.variants}
                handleReset={handleReset}
                // totalVariants={totalVariants}
                addVariantItems={addVariantItems}
                statusVariant={statusVariant}
                cancelVariant={cancelVariant}
                removeVariantItems={removeVariantItems}
                touched={touched}
                onReset={onReset}
                // variants={initialValues.variants}
                openVariant={openVariant}
              />
              </Form.Item>
              <Form.Item>
                <Measurement
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  dataProduct={props.dataProduct}
                  values={values}
                />
              </Form.Item>
              {/* <Form.Item> */}
                <StockManagement
                  setFieldValue={setFieldValue}
                  grid={grid}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              {/* </Form.Item> */}
              <div style={{textAlign: "right"}}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  {props.labelButton}
                </Button> 
              </div>
                 
            </Form>
          )}
        </Formik>
      
    </div>
  )
}

export default FormProduct