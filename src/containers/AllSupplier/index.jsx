import React, {useState} from 'react'
import {Row, Col, Spin, Card, Tag} from 'antd'
import Select from '../../components/Select'
import { PATH_SUPPLIER} from '../../services/path/supplier';
import {apiGetWithToken} from '../../services/api';
import strings from '../../localization'

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
    setFieldValue("supplier",value)
    setFetching(false)
  }

  return(
    <React.Fragment>
      <Card className="card" title={<div className="card-title">{strings.supplier_info}</div>}>
        <Row type="flex" align="middle">
          <Col md={props.grid.left}>
            <Row type="flex">
              <div className="card-content">{strings.supplier}</div>
              <Tag className="tag">{strings.required}</Tag>
            </Row>
          </Col>
          <Col md={props.grid.right} className="col-height">
          <Select
            showSearch
            onChange={(value) => change(value, props.setFieldValue)}
            onSearch={getAllSuppplier}
            name="supplier"
            // value={value}
            placeholder={strings.placeholder_supplier}
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