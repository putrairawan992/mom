import React, { useState, useEffect} from 'react';
import UploadImages from '../../containers/UploadImages';
import Variants from '../../containers/Variants';
import { Formik } from 'formik';
import { Form } from 'antd';
import Button from '../../components/Button';
import * as Yup from 'yup';
import ProductPrice from '../../containers/ProductPrice';
import ProductInfo from '../../containers/ProductInfo';
import Supplier from '../../containers/AllSupplier';
import {message} from 'antd';
import Measurement from '../../containers/Measurement';
import StockManagement from '../../containers/StockManagement';
import {apiPostWithToken} from '../../services/api'
import {PATH_PRODUCT} from '../../services/path/product'
import './style.sass';

const schema = Yup.object().shape({
  variants: Yup.array(Yup.object().shape({
    name: Yup.string().required(),
    variantItems: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('You have to fill the variant information before creating product.')
    }))
  })),
  supplier: Yup.string().required('Supplier is required').nullable(),
  productNameOriginal: Yup.string().required('Product name is required'),
  productName:  Yup.string().required('Product name is required'),
  category: Yup.string().required('Category is required'),
  basePrice: Yup.string().required('Base price is required.'),
  domesticFee: Yup.string().required('Domestic fee price is required.'),
  feeBySea: Yup.string().required('Shipment fee by sea is required.'),
  feeByAir: Yup.string().required('Shipment fee by air is required'),
  listImages:Yup.array().required("You have to upload at least one image to create product."),
  width: Yup.string().required(),
  length: Yup.string().required(),
  height: Yup.string().required(),
  actualWeight: Yup.string().required('Actual Weight is required')
});

const Product = () => {
  const [payloadImage, setPayloadImage] = useState([])
  // const [temp, setTemp] = useState([])
  const [totalVariants, setTotalVariants] = useState([])
  const [string] = useState({
    variantType : "",
    variantItems : [{
      name : "",
      image: {}
    }]
  })
  const [statusVariant, setStatusVariant] = useState(false)
  const [stringVariantType] = [{
    name : "",
    image: {}
  }]
  const grid = {
    left : 7,
    right: 17,
    priceRight: 12
  }

  const addVariant = () => {
    if(totalVariants.length < 2) setTotalVariants([...totalVariants,string])
    setStatusVariant(true)
  }

  const cancelVariant = (setValue,index,key) => {
    let total = [...totalVariants]
    if(total.length === 1){
      setStatusVariant(false)
      total.splice(index,1)
      setTotalVariants([...total])
      setValue(key,[])
    }else{
      total.splice(index,1)
      setTotalVariants([...total])
    }
  }

  const addVariantItems = (errors) => {
    if(!errors.variants){
      const arrTemp = [...totalVariants]
      const tempVariantItems = arrTemp.map(item => {
        return {...item, variantItems : [...item.variantItems, stringVariantType]}
      })
      setTotalVariants(tempVariantItems)
    }
  }

  useEffect(() => {
    setTotalVariants(totalVariants)
  },[totalVariants])

  const removeVariantItems = (indexType,indexVariant,values) => {
    const arrTemp = [...totalVariants]
    arrTemp.forEach((item,i) => {
      if(indexVariant === i) item.variantItems.splice(indexType,1)
    })
    values.forEach((value,i) => {
      if(indexVariant === i) {
        value.variantItems.splice(indexType,1)
      }
    })
    setTotalVariants(arrTemp)
    // console.log(values,"===", indexType)
  }

  const getPayloadImage = (dataImage) => {
    setPayloadImage(dataImage)
  }

  const handleSubmit = async(values) => {
    // console.log("===>",payloadImage)
    // let payloadimages = payload
    // console.log("ini values",values)
    
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
      // category.id = "a0413da0-2df5-4239-8f55-abf87a5ef8d2"
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
      fee.administration = values.administration
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
      // setTemp(allDataProduct)
    // let dummy = 
    //TODO fungsi post product
      try {
        const request = await apiPostWithToken(PATH_PRODUCT.CREATE, allDataProduct)
        console.log(request)
        message.success(request.data.code)
        // message.success("success")
      } catch (error) {
        message.error("error")
        console.log(error)
      }
  }

  return (
    <div className="containerProduct">
      <p className="title-page">
        Create Product
      </p>
      <Formik
          initialValues={{
            administration: "",
            actualWeight: "",
            variants: totalVariants,
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
            // maxOrder : ""
          }}
          onSubmit={values => {
            handleSubmit(values)
            
          }}
          validationSchema={schema}
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
              {
                // console.log("ini errors",errors)
                // JSON.stringify(temp)
              }
            </Form.Item>
            <Form.Item>
              <Supplier
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                grid={grid}
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
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                errors={errors}
                addVariant={addVariant}
                handleBlur={handleBlur}
                values={values.variants}
                handleReset={handleReset}
                totalVariants={totalVariants}
                addVariantItems={addVariantItems}
                statusVariant={statusVariant}
                cancelVariant={cancelVariant}
                removeVariantItems={removeVariantItems}
                touched={touched}
                onReset={onReset}
              />
              </Form.Item>
              <Form.Item>
                <Measurement
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <StockManagement
                  setFieldValue={setFieldValue}
                  grid={grid}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Form.Item>
              <div style={{textAlign: "right"}}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Add Product
                </Button> 
              </div>
                 
            </Form>
          )}
        </Formik>
      
    </div>
  )
}

export default Product