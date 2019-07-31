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
  const [allCategory,setAllCategory] = useState([])
  const [category, setCategory] = useState([])
  // const [category, setCategory] = useState(['7a8e64a9-2dce-41d0-bdcd-e0da053c8f4e','09afa381-7442-4239-960f-02f93702e026','d0c97895-0375-474c-8971-936555073dc6'])
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
        const response = await apiGetWithoutToken(PATH_CATEGORY.ALL_CATEGORY)
        const arrResponseCategory = response.data.data
        const arrCategory = converter(arrResponseCategory)
        if(context.initialValues.category){
          const contextCategory = context.initialValues.category
          const id = await getResponseCategory(arrResponseCategory,contextCategory)
          setCategory(id)
        }
        setAllCategory([...arrCategory])
      } catch (error) {
        console.log(error.response)
        setAllCategory([])
      }
    }
    getAllCategory()
  },[])

  const getResponseCategory = async(category,context) => {
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
            }else{
              return false
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

  const handleChange = (event,key) => {
    // setState(event.target.value)
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
              handleChange(e,'productNameOriginal')
              
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
              (e) =>handleChange(e,'productName')
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
            maxLength={2000}
            value={props.values.description}
            onChange={
              (e) => handleChange(e,'description')
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
