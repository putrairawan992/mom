import React, {useEffect, useState} from 'react';
import UploadImages from '../../containers/UploadImages';
import {PATH_CATEGORY} from '../../services/path/category';
import { PATH_SUPPLIER} from '../../services/path/supplier';
import {apiGetWithoutToken, apiGetWithToken} from '../../services/api';
import Cascader from '../../components/Cascader';
import Variants from '../../containers/Variants';
import { Formik, } from 'formik';
import { Form } from 'antd';
import Button from '../../components/Button';
import * as Yup from 'yup';
import ProductPrice from '../../containers/ProductPrice';
import Select from '../../components/Select';
import Supplier from '../../containers/AllSupplier'
import './style.sass'


const schema = Yup.object().shape({
  variants: Yup.array().of(Yup.object().shape({
    variantType: Yup.string().required(),
    // variantItems: Yup.array().of(Yup.object().shape({
    //   name: Yup.string().required('You have to fill the variant information befor creating product.')
    // }))
  })),
  // basePrice: Yup.string().required('Base price is required.'),
  // domesticFee: Yup.string().required('domesticFee price is required.'),
  // feeBySea: Yup.string().required('Shipment fee by sea is required.'),
  // feeByAir: Yup.string().required('Shipment fee by air is required'),
  // images:Yup.array().required("You have to upload at least one image to create product.")
});

const Product = () => {

  const [allSupplier, setAllSupplier] = useState([])
  const [allCategory,setAllCategory] = useState([])
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


  useEffect(() => {
    getAllCategory()
    getSupplier()
    // setTotalVariants(totalVariants)
  },[])

  // useEffect(() => {
    
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

  const getAllCategory = async() =>{
    try {
      const response = await apiGetWithoutToken(PATH_CATEGORY.ALL_CATEGORY)
      const arrResponseCategory = response.data.data
      const arrCategory = converter(arrResponseCategory)
      setAllCategory([...arrCategory])
    } catch (error) {
      console.log(error)
    }
  }

  const converter = (response) => {
    response.forEach((respSub,index) => {
      if(respSub.categorySubResponses){
        respSub.children = respSub.categorySubResponses
        respSub.categorySubResponses.forEach((resp) => {
          resp.children = resp.categorySubChildResponses
        })
      }
    })
    return response
  }

  const getPayloadImage = (dataImage) => {
    setPayloadImage(dataImage)
  }

  const onChange = async(value,selected) => {
    console.log(value,selected)
    
  }

  const filter = (inputValue, path) => {
    return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  
  const handleSubmit = (values) => {
    console.log("===>",payloadImage)
    // let payloadimages = payload
    let variants = values.variants
    console.log("ini values",values)
  }



  const getSupplier = async() => {
    try {
      const response  = await apiGetWithToken(PATH_SUPPLIER.ALL_SUPPLIER)
      const dataAllSuppler = response.data.data
      setAllSupplier([...dataAllSuppler])
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="containerProduct">
      <Select
       options={allSupplier}/>
       <Supplier/>
       <br/><br/>
     
      <Cascader
        options={allCategory}
        fieldNames={{label: 'name', value :'id'}}
        expandTrigger="hover"
        placeholder="Choose Category"
        onChange={(value,selected)=>onChange(value,selected)}
        showSearch={{filter}}
      />
      <br/><br/>
      <Formik
          initialValues={{
            variants: [],
            images: [],
            basePrice: "",
            domesticFee: "",
            feeBySea: "",
            feeByAir: ""
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
                // width="full"
                htmlType="submit"
                // disabled={isSubmitting}
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