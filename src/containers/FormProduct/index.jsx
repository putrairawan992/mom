import React, { useState, useContext } from "react";
import UploadImages from "../../components/UploadImages";
import ImagesContainer from "../../components/UploadImages/ImagesContainer"
// import Variants from "../../containers/Variants";
import { Formik } from "formik";
import { Form } from "antd";
import Button from "../../components/Button";
import ProductPrice from "../../containers/ProductPrice";
import ProductPriceContainer from "../../containers/ProductPrice/productPriceContainer"
import ProductInfo from "../../containers/ProductInfo";
import ProductInfoContainer from "../../containers/ProductInfo/ProductInfoContainer"
import SupplierInfo from "../../containers/SupplierInfo";
import SupplierContainer from "../../containers/SupplierInfo/supplierContainer"
import Measurement from "../../containers/Measurement";
import MeasurementContainer from "../../containers/Measurement/measurementContainer"
import StockManagement from "../../containers/StockManagement";
import ProductContext from "../../context/GlobalStateProduct/product-context";
// import { schema } from "./schema";
import "./style.sass";
import VideoProduct from "../VideoProduct";

export default function FormProduct(props) {
  const context = useContext(ProductContext);
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
    videoUrl: ""
  })
  const grid = {
    left: 7,
    right: 17,
    priceRight: 12
  };

  function handleChangeValue (value , name) {
    setInitialValues({
      ...initialValues, [name] : value
    })
  }

  function handleChangeCategory (value) {
    const selectedValue = value[value.length -1]
    setInitialValues({
      ...initialValues, category : selectedValue
    })
  }

  function handleSubmit(values) {
      console.log(values);
  };

  return (
    <div className="containerProduct">
      <p className="title-page">{context.titleForm}</p>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values => {
          handleSubmit(values);
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
              <SupplierContainer>
                {(props) => (
                  <SupplierInfo
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    grid={grid}
                    handleChangeValue={handleChangeValue}
                    {...props}
                  />
                )}
              </SupplierContainer>
            </Form.Item>
              <ProductInfoContainer setFieldValue={setFieldValue}  >
                {(props) =>(
                  <ProductInfo
                    handleBlur={handleBlur}
                    handleChangeValue={handleChangeValue}
                    errors={errors}
                    touched={touched}
                    values={values}
                    grid={grid}
                    handleChangeCategory={handleChangeCategory}
                    dataProduct={props.dataProduct}
                    {...props}
                 />
                )}
              </ProductInfoContainer>
              <br/>
              <Form.Item>
                <ImagesContainer maxImage={5} handleChangeValue={handleChangeValue}>
                  {(props) => (
                    <UploadImages
                      errors={errors}
                      touched={touched}
                      {...props}
                    />
                  )}
                </ImagesContainer>
              </Form.Item>
              <Form.Item>
                <VideoProduct
                  handleChange={handleChange}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleBlur={handleBlur}
                  grid={grid}
                  values={values}
                />
            </Form.Item>
            <Form.Item>
              <ProductPriceContainer setFieldValue={setFieldValue} >
                {(props) => (
                  <ProductPrice
                    errors={errors}
                    handleChangeValue={handleChangeValue}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    handleBlur={handleBlur}
                    grid={grid}
                    {...props}
                  />
                )}
              </ProductPriceContainer>
            </Form.Item>
            <Form.Item>
              <MeasurementContainer setFieldValue={setFieldValue}  >
                {(props) => (
                  <Measurement
                    errors={errors}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    handleBlur={handleBlur}
                    dataProduct={props.dataProduct}
                    values={values}
                    {...props}
                  />
                )}
              </MeasurementContainer>
            </Form.Item>
              <StockManagement
                setFieldValue={setFieldValue}
                grid={grid}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                handleChangeValue={handleChangeValue}
              />
           
            {/*
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
            <div style={{ textAlign: "right" }}>
              <Button type="primary" size="large" htmlType="submit">
                {context.labelButton}
              </Button>
            </div> */}
            <div style={{ textAlign: "right" }}>
              <Button type="primary" size="large" htmlType="submit">
                Save
              </Button>
            </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};