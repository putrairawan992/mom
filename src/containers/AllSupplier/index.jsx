import React, {useState} from 'react'
import {Spin} from 'antd'
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
  const handleChange = (value) => {
    console.log(value)
    setFetching(false)
    setValue(value)
    setOptions([])
  }

  return(
    <Select
      mode="multiple"
      onChange={handleChange}
      onSearch={getAllSuppplier}
      // value={value}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      labelInvalue
      options={options}
      />
  )
} 

export default AllSupplier