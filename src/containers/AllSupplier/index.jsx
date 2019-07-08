import React, {useState} from 'react'
import {Row, Col,Spin,Card} from 'antd'
import debounce from 'lodash/debounce'
import Select from '../../components/Select'
import { PATH_SUPPLIER} from '../../services/path/supplier';
import {apiGetWithoutToken, apiGetWithToken} from '../../services/api';

const AllSupplier = (props) => {
  const [value,setValue] = useState([])
  const [fetching, setFetching] = useState(false)
  
  const [options,setOptions] = useState([])


  const getAllSuppplier = async(value) => {
    try {


      setFetching(true)
      const response  = await apiGetWithToken(PATH_SUPPLIER.ALL_SUPPLIER)
      const dataAllSuppler = response.data.data
      
      
      console.log("sups",dataAllSuppler)

      const resultSupplier = dataAllSuppler.map(supplier =>({
        ...supplier, name : `${supplier.code} - ${supplier.name}`
      }))
      setOptions(resultSupplier)
      console.log(resultSupplier)
    } catch (error) {
      console.log(error)
    }
  }

  // getAllSuppplier = debounce(getAllSuppplier, 800)
  const change = (value,setFieldValue) => {
    setFieldValue("supplier",value)
    console.log(value)
    setFetching(false)
    // setValue(value)
    // setOptions([])
  }

  console.log(props.errors)

  return(
    <React.Fragment>
      <Card title={<div className="card-title">Supplier Info</div>}>
        <Row>
          <Col md={7}>
            <div className="card-content">Supplier</div>
          </Col>
          <Col md={15}>
          <Select
            mode="multiple"
            onChange={(value) => change(value, props.setFieldValue)}
            onSearch={getAllSuppplier}
            name="supplier"
            // value={value}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            labelInvalue
            options={options}
            />
            {
            typeof props.errors.supplier === 'string' ? 
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