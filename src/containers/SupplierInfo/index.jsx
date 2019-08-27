import React, {useState} from 'react'
import {Row, Col, Spin, Card, Tag} from 'antd'
import Select from '../../components/Select'
import strings from '../../localization'
import Supplier from "../../repository/Supplier"

export default function SupplierInfo(props) {
  const [loading, setLoading] = useState(false)
  const [supplierOptions, setSupplierOptions] = useState([])

  async function getSuppliersByKeyword(keyword) {
    setSupplierOptions([]);
    const suppliersResp  = await Supplier.getAll({
      loading: setLoading
    });

    if(suppliersResp.status === 200) {
      const suppliers = suppliersResp.data.data
      const supplierOptions = suppliers.map(supplier =>({
        ...supplier, name : `${supplier.code} - ${supplier.name}`
      }))
      setSupplierOptions(supplierOptions);
    } else {
      setSupplierOptions([]);
    }
  }

  const handleChange = (value) => {
    props.setFieldValue("supplier",value)
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
            onChange={(value) => handleChange(value)}
            onSearch={(value) => getSuppliersByKeyword(value)}
            name="supplier"
            placeholder={strings.placeholder_supplier}
            size="large"
            onBlur={props.handleBlur}
            notFoundContent={loading ? <Spin size="small" /> : null}
            filterOption={false}
            labelInvalue
            options={supplierOptions}
            type={ props.errors.supplier ? 'error' : 'default' }
          />
          { props.errors.supplier && <div className="text-error-message">{props.errors.supplier }</div> }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
   
  )
}