import React, { useState, useContext, useEffect } from "react";
import ImagesContainer from "../../components/UploadImages/ImagesContainer"
import VariantsContainer from "../../containers/Variants/variantsContainer"
import { Formik, FieldArray } from "formik";
import { Form } from "antd";
import Button from "../../components/Button";
import ProductPriceContainer from "../../containers/ProductPrice/productPriceContainer";
import ProductInfoContainer from "../../containers/ProductInfo/ProductInfoContainer";
import SupplierContainer from "../../containers/SupplierInfo/supplierContainer";
import MeasurementContainer from "../../containers/Measurement/measurementContainer";
import StockManagement from "../../containers/StockManagement";
import ProductContext from "../../context/GlobalStateProduct/product-context";
import { schema } from "./schema";
import "./style.sass";
import VideoProduct from "../VideoProduct";
import uuid4 from "uuid";
import Category from '../../repository/Category';
import Product from "../../repository/Product"

export default function FormProduct(props) {
  const context = useContext(ProductContext);
  const [openVariant, setOpenVariant] = useState(false)
  const [all, setAll] = useState({})
  const [initialValues,setInitialValues] = useState({
    id: '',
    administration: "",
    actualWeight: "",
    listImages: {},
    supplier: "",
    supplierName : "",
    basePrice: "",
    domesticFee: "",
    price : "",
    shipment : {},
    feeBySea: "",
    feeByAir: "",
    productNameOriginal: "",
    productName: "",
    category: [],
    description: "",
    width: "",
    length: "",
    height: "",
    volumeWeight : 0,
    rate: "",
    readyStock: true,
    quantity: "",
    videoUrl: "",
    isFragile: false,
    isActive : true,
    variants: [
      {
        name : "",
        id : uuid4(),
        variantItems: [
          {
            name : "",
            image : {},
            id: uuid4()
          }
        ]
      }
    ]
  })
  const grid = {
    left: 7,
    right: 17,
    priceRight: 12
  };

  useEffect(() => {
    if(props.id){
      const getProductById = async function () {
        const response = await Product.get({productId: props.id})
        if(response.status === 200){
          const data = response.data.data
          getDataProduct(data)
        }else{
          return response
        }
      }
      getProductById()
    }
   
  },[props.id])

  // useEffect(() => {
  //   let arr = []
  //   let obj = {}
  //   for(let i =0 ; i< 5 ; i++){
  //     obj.largeUrl = ''
  //     obj.mediumUrl = ''
  //     obj.smallUrl = ''
  //     arr.push(obj)
  //   }
  //   setInitialValues({
  //     ...initialValues, listImages : arr
  //   })
  // },[])

  const open = function () {
    setOpenVariant(!openVariant)
  }

  const allCategory = async function () {
    const allCategory = await Category.getAll();
    if(allCategory.status === 200){
      return allCategory
    }
  }

  const getResponseCategory = (category,context) => {
    let arrCategoryId = []      
    if(context.level === 'LEVEL1'){
      arrCategoryId.push(context.id)
    }else if(context.level === 'LEVEL3'){
      const t = category.filter(cat => {
        let subRespone = cat.categorySubResponses
        if(subRespone){
          for(let i = 0; i< subRespone.length ; i++){
            if(subRespone[i].id === context.parent){
              return true
            }
          }
        }
      })
      let [data] = t
      arrCategoryId.push(data.id,context.parent,context.id)
    }else{
      arrCategoryId.push(context.parent,context.id)
    }
    return arrCategoryId
  }

  const getAllLevelCategory = async function (information) {
    const category = await allCategory()
    const convert = getResponseCategory(category.data.data, information)
    return convert
  }

  const getDataProduct = async function (data) {
    const { information } = data
    if(data.variants){
      open()
    }
    const category = await getAllLevelCategory(information.category)
    const images = mapperImage(data.images)
    setAll(images)
    setInitialValues({
      ...initialValues, 
      supplier : data.supplier.id,
      supplierName : `${data.supplier.code} - ${data.supplier.name}`,
      productNameOriginal : information.nameChinese,
      productName : information.name,
      description : information.description,
      category : category,
      variants : data.variants,
      listImages : images,
      basePrice : data.price.basePrice.cny,
      price : data.price,
      domesticFee : data.price.fee.domestic,
      administration : data.price.fee.administration,
      shipment : data.shipmentFee,
      feeByAir : data.shipmentFee.air,
      feeBySea : data.shipmentFee.sea,
      rate : data.price.rate,
      actualWeight: data.measurement.weight,
      width : data.measurement.dimension.width,
      height : data.measurement.dimension.height,
      length: data.measurement.dimension.length,
      videoUrl : data.videoUrl,
      quantity : data.information.maxOrder,
      volumeWeight : data.measurement.dimension.volumeWeight,
      isFragile : data.information.isFragile,
      id : data.id
    })
  }

  const mapperImage = function (images) {
      let tempObj = {}
      images.forEach((img, i) => {
        let key =  `image${i}`
        tempObj = {...tempObj , [key] : {...tempObj[key] , 
          largeUrl : img.largeUrl,
          isDefault : img.isDefault,
          mediumUrl : img.mediumUrl,
          smallUrl : img.smallUrl
        }}
      })
      return tempObj
  }

  function handleChangeValue (value , name) {
    setInitialValues({
      ...initialValues, [name] : value
    })
  }

  async function handleSubmit(values) {
    // console.log({values})
    props.actionSave(values)
  };

  return (
    <div className="containerProduct">
      <p className="title-page">{context.titleForm}</p>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => {
          handleSubmit(values);
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
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <SupplierContainer
                values={values}
                errors={errors}
                touched={touched}
                onChange={(name ,value) => setFieldValue(name, value)}
                grid={grid}
                handleChangeValue={handleChangeValue}
              />
            </Form.Item>
              <ProductInfoContainer
                handleBlur={handleBlur}
                handleChangeValue={handleChangeValue}
                onChange={(name ,value) => setFieldValue(name, value)}
                errors={errors}
                touched={touched}
                values={values}
                grid={grid}
              />
              <br/>
              <Form.Item>
                <FieldArray 
                  name="variants"
                  render={helperVariants => (
                    <VariantsContainer
                      push = {(value) => helperVariants.push(value)}
                      onRemove={(index) => helperVariants.remove(index) }
                      onChange={(name ,value) => setFieldValue(name, value)}
                      variants={values.variants}
                      errors={errors}
                      touched={touched}
                      name={"variants"}
                      handleChange={handleChange}
                      open={open}
                      openVariant={openVariant}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <ImagesContainer 
                  maxImage={5} 
                  onChange={(name ,value) => setFieldValue(name, value)}
                  values={values}
                  all={all}
                  errors={errors}
                  touched={touched}
                />
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
              <ProductPriceContainer 
                values={values}
                onChange={(name,value) => setFieldValue(name,value)}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                grid={grid}
              />
            </Form.Item>
            <Form.Item>
              <MeasurementContainer 
                values={values} 
                setFieldValue={setFieldValue}  
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                onChange={(name,value) => setFieldValue(name,value)}
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
                handleChangeValue={handleChangeValue}
              />
            <div style={{ textAlign: "right" }}>
              <Button type="primary" size="large" htmlType="submit">
                Save Product
              </Button>
            </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};