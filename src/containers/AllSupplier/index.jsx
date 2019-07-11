import React, {useState} from 'react'
import {Row, Col, Spin, Card, Tag} from 'antd'
// import debounce from 'lodash/debounce'
import Select from '../../components/Select'
import { PATH_SUPPLIER} from '../../services/path/supplier';
import {apiGetWithToken} from '../../services/api';

const AllSupplier = (props) => {
  const [fetching, setFetching] = useState(false)
  const [options,setOptions] = useState([])
  const getAllSuppplier = async(value) => {
    try {
      setFetching(true)
      const response  = await apiGetWithToken(PATH_SUPPLIER.ALL_SUPPLIER)
      const dataAllSuppler = response.data.data
      const resultSupplier = dataAllSuppler.map(supplier =>({
        ...supplier, name : `${supplier.code} - ${supplier.name}`
      }))
      setOptions(resultSupplier)
    } catch (error) {
      console.log(error)
    }
  }

  const change = (value,setFieldValue) => {
    console.log(value)
    setFieldValue("supplier",value)
    setFetching(false)
  }

  // console.log(props.errors)

  return(
    <React.Fragment>
      <Card className="card" title={<div className="card-title">Supplier Info</div>}>
        <Row type="flex" align="middle">
          <Col md={props.grid.left}>
            <Row type="flex">
              <div className="card-content">Supplier</div>
              <Tag className="tag">Required</Tag>
            </Row>
          </Col>
          <Col md={props.grid.right}>
          <Select
            showSearch
            onChange={(value) => change(value, props.setFieldValue)}
            onSearch={getAllSuppplier}
            name="supplier"
            // value={value}
            placeholder="Choose Supplier"
            size="large"
            onBlur={props.handleBlur}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            labelInvalue
            options={options}
            type={
              typeof props.errors.supplier === 'string' && props.touched.supplier ? 
              'error' : 'default'
            }
          />
            {
            typeof props.errors.supplier === 'string' && props.touched.supplier ? 
            (<div className="text-error-message">{props.errors.supplier }</div>) :
            null
          }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
   
  )
} 

export default AllSupplier