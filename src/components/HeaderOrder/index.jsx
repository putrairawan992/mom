import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Select, Input } from "antd";

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const HeaderOrder = props => (
  <Card>
    <Row type="flex" justify="space-between">
      <Col>
        <span>Filter </span>
        <Select
          defaultValue="laut"
          style={{ width: 120 }}
          onChange={() => props.onChange}
        >
          <Option value="udara">By Air</Option>
          <Option value="laut">By Sea</Option>
        </Select>
      </Col>
      <Col>
        <InputGroup compact>
          <Select defaultValue="invoice">
            <Option value="invoice">No. Invoice</Option>
            <Option value="name">Supplier Name</Option>
            <Option value="code">Supplier Code</Option>
          </Select>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </InputGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <span>Total Orders : {"10"}</span>
      </Col>
    </Row>
  </Card>
);

HeaderOrder.propTypes = {
  data: PropTypes.arrayOf(Object)
};

export default HeaderOrder;
