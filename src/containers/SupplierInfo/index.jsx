import React from 'react'
import {Row, Col, Spin, Card, Tag} from 'antd'
import Select from '../../components/Select'
import strings from '../../localization'

export default function SupplierInfo(props) {
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
            onChange={(value) => props.handleChangeValue(value, 'supplier')}
            onSearch={(value) => props.getSuppliersByKeyword(value)}
            name="supplier"
            placeholder={strings.placeholder_supplier}
            size="large"
            onBlur={props.handleBlur}
            notFoundContent={props.loading ? <Spin size="small" /> : null}
            filterOption={false}
            labelInvalue
            options={props.supplierOptions}
            type={ props.errors.supplier ? 'error' : 'default' }
          />
          { props.errors.supplier && <div className="text-error-message">{props.errors.supplier }</div> }
          </Col>
        </Row>
      </Card>
    </React.Fragment>
   
  )
}