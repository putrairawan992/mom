import React, { useEffect, useState } from 'react';
import Cascader from '../../components/Cascader';
import {Card, Row, Col} from 'antd';
import {PATH_CATEGORY} from '../../services/path/category';
import {apiGetWithoutToken} from '../../services/api';
import Input from '../../components/Input';

const ProductInfo = (props) => {
  const [allCategory,setAllCategory] = useState([])

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

  const filter = (inputValue, path) => {
    return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  const onChange = async(value,selected) => {
    console.log(value,selected)
    
  }

  useEffect(() => {
    getAllCategory()
  })

  return(
    <Card>
      <Row>
        <Col md={7}>
          <div className="card-content">Product Name (CNY)</div>
          <div className="card-sub-content">
            Original product name from supplier.
          </div>
        </Col>
        <Col md={15}>
          <Input
            name="productNameOriginal"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          {
            props.errors.productNameOriginal && props.touched.productNameOriginal ? 
            (<div className="text-error-message">{props.errors.productNameOriginal }</div>) :
            null
          }
        </Col>
      </Row>
      <br/><br/>
      <Row>
        <Col md={7}>
          <div className="card-content">Product Name</div>
          <div className="card-sub-content">
          Product name that will be seen by customers
          </div>
        </Col>
        <Col md={15}>
          <Input
            name="productName"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
           {
            props.errors.productName && props.touched.productName ? 
            (<div className="text-error-message">{props.errors.productName }</div>) :
            null
          }
        </Col>
      </Row>
      <br/><br/>
      <Row>
        <Col md={7}>
          <div className="card-content">Category</div>
        </Col>
        <Col md={15}>
          <Cascader
          options={allCategory}
          fieldNames={{label: 'name', value :'id'}}
          expandTrigger="hover"
          placeholder="Choose Category"
          onChange={(value,selected)=>onChange(value,selected)}
          showSearch={{filter}}
          />
        </Col>
      </Row>
    </Card>
   
  )

}

export default ProductInfo
