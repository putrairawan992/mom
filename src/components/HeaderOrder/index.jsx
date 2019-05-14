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
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={() => props.onChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Col>
      <Col>
        <InputGroup compact>
          <Select defaultValue="Option1">
            <Option value="Option1">Invoice</Option>
            <Option value="Option2">Supp. Name</Option>
          </Select>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </InputGroup>
      </Col>
    </Row>
  </Card>
);

HeaderOrder.propTypes = {
  data: PropTypes.arrayOf(Object)
};

export default HeaderOrder;
