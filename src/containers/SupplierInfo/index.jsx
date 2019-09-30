import React from 'react'
import {Row, Col, Spin, Card, Tag, Form} from 'antd'
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
          <Form.Item
            validateStatus={ (props.errors.supplier && props.touched.supplier )  ? 'error' : 'success'}
            help={ (props.errors.supplier && props.touched.supplier ) && props.errors.supplier}
          >
            <Select
              showSearch
              onChange={(value) => {
                props.onChange('supplier', value)
              }}
              onSearch={(value) => props.getSuppliersByKeyword(value)}
              name="supplier"
              placeholder={strings.placeholder_supplier}
              size="large"
              value={props.values.supplierName ? props.values.supplierName : props.values.supplier }
              notFoundContent={props.loading ? <Spin size="small" /> : null}
              filterOption={false}
              labelInvalue
              options={props.supplierOptions}
            />
          </Form.Item>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
   
  )
}