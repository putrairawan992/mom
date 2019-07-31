import React, { useState, useContext} from 'react';
import UploadImages from '../../containers/UploadImages';
import Variants from '../../containers/Variants';
import { Formik } from 'formik';
import { Form } from 'antd';
import Button from '../../components/Button';
import ProductPrice from '../../containers/ProductPrice';
import ProductInfo from '../../containers/ProductInfo';
import Supplier from '../../containers/AllSupplier';

import Measurement from '../../containers/Measurement';
import StockManagement from '../../containers/StockManagement';
import ProductContext from '../../context/GlobalStateProduct/product-context';
import {schemaProduct} from '../../schema'
import './style.sass';

const FormProduct = (props) => {
  const context = useContext(ProductContext)
  const [payloadImage, setPayloadImage] = useState([])
  const grid = {
    left : 7,
    right: 17,
    priceRight: 12
  }
  
  const getPayloadImage = (dataImage) => {
    setPayloadImage(dataImage)
  }

  const handleSubmit = async(values) => { 
    console.log("values",values)
    const images = payloadImage.filter(image => {
      return image.largeUrl
    })
    return context.addProduct(values,images)
   
  }

 
  
  return (
    <div className="containerProduct">
      <p className="title-page">
        {context.titleForm}
      </p>
      <Formik
          initialValues={context.initialValues}
          enableReinitialize
          onSubmit={values => {
            handleSubmit(values)
            
          }}
          validationSchema={schemaProduct}
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
              <ProductPrice
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
                handleBlur={handleBlur}
                grid={grid}
              />
            <Form.Item>
              <Variants
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                errors={errors}
                handleBlur={handleBlur}
                values={values.variants}
                handleReset={handleReset}
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
                  dataProduct={props.dataProduct}
                  values={values}
                />
              </Form.Item>
                <StockManagement
                  setFieldValue={setFieldValue}
                  grid={grid}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              <div style={{textAlign: "right"}}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  {context.labelButton}
                </Button> 
              </div>
                 
            </Form>
          )}
        </Formik>
      
    </div>
  )
}

export default FormProduct