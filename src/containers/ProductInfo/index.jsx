import React, { useEffect, useState, useContext } from 'react';
import Cascader from '../../components/Cascader';
import {Card, Row, Col, Tag} from 'antd';
import {PATH_CATEGORY} from '../../services/path/category';
import {apiGetWithoutToken} from '../../services/api';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import strings from '../../localization';
import ProductContext from '../../context/GlobalStateProduct/product-context'

const ProductInfo = (props) => {
  const context = useContext(ProductContext)
  const {initialValues} = context
  const [allCategory,setAllCategory] = useState([])
  const [productNameOriginal, setProductNameOriginal] = useState("")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState([])
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
  
  const filter = (inputValue, path) => {
    return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  const onChange = async(value,setFieldValue) => {
    setFieldValue("category",value)
    const changeValue = value.map((val) => {
      return [...category, val]
    })
    setCategory(value)
  }

  useEffect(() => {
    const getAllCategory = async() =>{
      try {
        if(props.dataProduct){
          const dataProductInformation = props.dataProduct.information
          setProductNameOriginal(dataProductInformation.nameChinese)
          setProductName(dataProductInformation.name)
          setDescription(dataProductInformation.description)
          setCategory([...category, dataProductInformation.category.id])
        }
        const response = await apiGetWithoutToken(PATH_CATEGORY.ALL_CATEGORY)
        const arrResponseCategory = response.data.data
        const arrCategory = converter(arrResponseCategory)
        setAllCategory([...arrCategory])
      } catch (error) {
        console.log(error.response)
        setAllCategory([])
      }
    }
    getAllCategory()
  },[])

  const handleChange = (event,key,setState) => {
    setState(event.target.value)
    props.setFieldValue(key,event.target.value)
  }

  return(
    <Card className="card" title={<div className="card-title">{strings.product_information}</div>}>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.product_name_cny}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
          <div className="card-sub-content">{strings.product_cny_quote}</div>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Input
            name="productNameOriginal"
            value={props.values.productNameOriginal}
            onChange={(e) => {
              handleChange(e,'productNameOriginal',setProductNameOriginal)
              
            }}
            onBlur={props.handleBlur}
            size="large"
            status={
              props.errors.productNameOriginal && props.touched.productNameOriginal ?
              "error" : "default"
            }
          />
          {
            props.errors.productNameOriginal && props.touched.productNameOriginal ? 
            (<div className="text-error-message">{props.errors.productNameOriginal }</div>) :
            null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.product_name}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
          <div className="card-sub-content">
            {strings.product_name_quote}
          </div>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Input
            name="productName"
            // onChange={props.handleChange}
            onChange={
              (e) =>handleChange(e,'productName',setProductName)
            }
            onBlur={props.handleBlur}
            value={props.values.productName}
            size="large"
            status={
              props.errors.productName && props.touched.productName ? 
              "error" : "default"
            }
          />
           {
            props.errors.productName && props.touched.productName ? 
            (<div className="text-error-message">{props.errors.productName }</div>) :
            null
          }
        </Col>
      </Row>
      <br/>
      <Row type="flex">
        <Col md={props.grid.left}>
          <div className="card-content">{strings.product_description}</div>
          <div className="card-sub-content">
            {strings.product_description_quote}
          </div>
        </Col>
        <Col md={props.grid.right}>
          <TextArea
            name="description"
            autosize={{ minRows: 6, maxRows: 6}}
            // onChange={props.handleChange}
            maxLength={2000}
            value={description}
            // value={props.values.description}
            onChange={
              (e) => handleChange(e,'description',setDescription)
            }
          />
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">{strings.category}</div>
            <Tag className="tag">{strings.required}</Tag>
          </Row>
        </Col>
        <Col md={props.grid.right} className="col-height">
          <Cascader
            options={allCategory}
            fieldNames={{label: 'name', value :'id'}}
            expandTrigger="hover"
            name="category"
            // onBlur={props.handleBlur}
            value ={category}
            placeholder="Choose Category"
            onChange={(value,selected)=>onChange(value, props.setFieldValue)}
            showSearch={{filter}}
            size="large"
            type={
              props.errors.category && props.touched.category?
              "error" : "default"
            }
            // selectedCategory={selectedCategory}
          />
          {
            props.errors.category && props.touched.category? 
            (<div className="text-error-message">{props.errors.category }</div>) :
            null
          }
        </Col>
      </Row>
    </Card>
   
  )

}

export default ProductInfo
