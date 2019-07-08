import React, { useState} from 'react';
import UploadImages from '../../containers/UploadImages';
import Variants from '../../containers/Variants';
import { Formik } from 'formik';
import { Form } from 'antd';
import Button from '../../components/Button';
import * as Yup from 'yup';
import ProductPrice from '../../containers/ProductPrice';
import ProductInfo from '../../containers/ProductInfo';
import Supplier from '../../containers/AllSupplier';
import {message} from 'antd'
import './style.sass'


const schema = Yup.object().shape({
  variants: Yup.array().of(Yup.object().shape({
    variantType: Yup.string().required(),
    variantItems: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('You have to fill the variant information befor creating product.')
    }))
  })),
  supplier: Yup.array().required('Supplier is required'),
  productNameOriginal: Yup.string().required('Product name is required'),
  productName:  Yup.string().required('Product name is required'),
  basePrice: Yup.string().required('Base price is required.'),
  domesticFee: Yup.string().required('domesticFee price is required.'),
  feeBySea: Yup.string().required('Shipment fee by sea is required.'),
  feeByAir: Yup.string().required('Shipment fee by air is required'),
  images:Yup.array().required("You have to upload at least one image to create product."),

});

const Product = () => {
  const [payloadImage, setPayloadImage] = useState([])
  const [errorVariant, setErrorVariant] = useState([])
  const [totalVariants, setTotalVariants] = useState([])
  const [string, setString] = useState({
    variantType : "",
    variantItems : [{
      name : "",
      image: {}
    }]
  })
  const [statusVariant, setStatusVariant] = useState(false)
  const [stringVariantType, setNewJob] = [{
    name : "",
    image: {}
  }]


  // useEffect(() => {
  //   getAllCategory()
  //   getSupplier()
   
  // },[])

  const addVariant = () => {
    
    if(totalVariants.length < 2) setTotalVariants([...totalVariants,string])
    setStatusVariant(true)
    
  }
  // console.log("ini total",totalVariants)
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

  const addVariantItems = () => {
    const arrTemp = [...totalVariants]
    const tempVariantItems = arrTemp.map(item => {
      return {...item, variantItems : [...item.variantItems, stringVariantType]}
    })
    setTotalVariants(tempVariantItems)
  }

  const removeVariantItems = (index) => {
    const arrTemp = [...totalVariants]
    arrTemp.forEach(item => {
      item.variantItems.splice(index,1)
    })
    setTotalVariants(arrTemp)
  }

  const getPayloadImage = (dataImage) => {
    setPayloadImage(dataImage)
  }

  const handleSubmit = (values) => {
    console.log("===>",payloadImage)
    // let payloadimages = payload
    let variants = values.variants
    console.log("ini values",values)
    message.success("Success")
  }

  return (
    <div className="containerProduct">
      {/* <Select
       options={allSupplier}/> */}
     
       <br/><br/>
      
     
      <br/><br/>
      <Formik
          initialValues={{
            variants: [],
            images: [],
            supplier: [],
            basePrice: "",
            domesticFee: "",
            feeBySea: "",
            feeByAir: "",
            productNameOriginal: "",
            productName: ""
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
            handleReset
          }) => (
            
            <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Supplier
                setFieldValue={setFieldValue}
                errors={errors}
              />
            </Form.Item>
            <Form.Item>
              <ProductInfo
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
              />
            </Form.Item>
            <Form.Item>
              <UploadImages
                maxImage={5}
                getPayloadImage={getPayloadImage}
                setFieldValue={setFieldValue}
                errors={errors}  
              />
            </Form.Item>
            <Form.Item>
              <ProductPrice
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
                handleBlur={handleBlur}
              />
             
            </Form.Item>
            <Form.Item>
              <Variants
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                errors={errors}
                errorVariant={errorVariant}
                addVariant={addVariant}
                handleBlur={handleBlur}
                values={values.variants}
                handleReset={handleReset}
                totalVariants={totalVariants}
                addVariantItems={addVariantItems}
                statusVariant={statusVariant}
                cancelVariant={cancelVariant}
                removeVariantItems={removeVariantItems}
              />
              </Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
              >
                Add Product
              </Button>    
            </Form>
          )}
        </Formik>
      
    </div>
  )
}

export default Product