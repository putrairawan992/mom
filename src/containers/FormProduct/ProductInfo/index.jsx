import React, { useEffect, useState, useContext } from 'react';
import Cascader from '../../../components/Cascader';
import {Card, Row, Col, Tag} from 'antd';
import {PATH_CATEGORY} from '../../../services/path/category';
import {apiGetWithoutToken} from '../../../services/api';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import strings from '../../../localization';
import Category from '../../../repository/Category';
import _ from 'lodash';

export default function ProductInfo(props) {
  const [allCategory,setAllCategory] = useState([])

  useEffect(() => {
    getAllCategory();
  },[])

  function convertCategoryToSchemaInput(response) {
    let allCategory = response;
    allCategory.forEach((respSub) => {
      if(respSub.categorySubResponses){
        respSub.children = respSub.categorySubResponses
        respSub.categorySubResponses.forEach((resp) => {
          resp.children = resp.categorySubChildResponses
        })
      }
    })
    return allCategory;
  }
  
  const filter = (inputValue, path) => {
    return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  async function getAllCategory() {
    const allCategoryResp = await Category.getAll();

    if(allCategoryResp.status === 200) {
      const allCategory = convertCategoryToSchemaInput(allCategoryResp.data.data);
      setAllCategory(allCategory);
    } else {
      setAllCategory([]);
    }
  }


  function handleChangeCategory(value) {
    console.log(value);
    let category = [];
    const changeValue = value.map((val) => {
      return [...category, val]
    })
    console.log(category);


    // props.setFieldValue('category', value);
  }

  function handleChange(key, value) {
    props.setFieldValue(key, value)
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
            onChange={event => handleChange('productNameOriginal', event.target.value)}
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
            onChange={event => handleChange('productName', event.target.value)}
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
            onChange={ event => handleChange('description', event.target.value) }
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
            placeholder="Choose Category"
            onChange={(value,selected)=>handleChangeCategory(value)}
            showSearch={{filter}}
            size="large"
            type={
              props.errors.category && props.touched.category?
              "error" : "default"
            }
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