import React, { useEffect, useState } from 'react';
import Cascader from '../../components/Cascader';
import {Card, Row, Col, Tag} from 'antd';
import {PATH_CATEGORY} from '../../services/path/category';
import {apiGetWithoutToken} from '../../services/api';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

const ProductInfo = (props) => {
  const [allCategory,setAllCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

 

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

  const onChange = async(value,selected,setFieldValue) => {
    setFieldValue("category",value)
    const selectedValue = selected.map(option => option.name).join('/ ')
    setSelectedCategory(selectedValue)
  }

  useEffect(() => {
    const getAllCategory = async() =>{
      try {
        const response = await apiGetWithoutToken(PATH_CATEGORY.ALL_CATEGORY)
        const arrResponseCategory = response.data.data
        const arrCategory = converter(arrResponseCategory)
        setAllCategory([...arrCategory])
        console.log("category",arrCategory)
      } catch (error) {
        console.log(error)
      }
    }
    getAllCategory()
  },[])

  return(
    <Card className="card" title={<div className="card-title">Product Information</div>}>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">Product Name (CNY)</div>
            <Tag className="tag">Required</Tag>
          </Row>
          <div className="card-sub-content">
            Original product name from supplier.
          </div>
        </Col>
        <Col md={props.grid.right}>
          <Input
            name="productNameOriginal"
            onChange={props.handleChange}
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
      <br/><br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">Product Name</div>
            <Tag className="tag">Required</Tag>
          </Row>
          <div className="card-sub-content">
            Product name that will be seen by customers
          </div>
        </Col>
        <Col md={props.grid.right}>
          <Input
            name="productName"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
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
      <br/><br/>
      <Row type="flex">
        <Col md={props.grid.left}>
          <div className="card-content">Product Description</div>
          <div className="card-sub-content">
            Product Descrption helps customer
            understanding the product, it can contain of what material that used
            or anything that related to the product
          </div>
        </Col>
        <Col md={props.grid.right}>
          <TextArea
            name="description"
            autosize={{ minRows: 6, maxRows: 6}}
            onChange={props.handleChange}
            maxLength={2000}
            value={props.values.description}
          />
        </Col>
      </Row>
      <br/>
      <Row type="flex" align="middle">
        <Col md={props.grid.left}>
          <Row type="flex" align="middle">
            <div className="card-content">Category</div>
            <Tag className="tag">Required</Tag>
          </Row>
        </Col>
        <Col md={props.grid.right}>
          <Cascader
            options={allCategory}
            fieldNames={{label: 'name', value :'id'}}
            expandTrigger="hover"
            name="category"
            // onBlur={props.handleBlur}
            placeholder="Choose Category"
            onChange={(value,selected)=>onChange(value,selected, props.setFieldValue)}
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
