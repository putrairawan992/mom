import React,{useState} from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Select, Input } from "antd";
import "./style.sass";

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const HeaderOrder = props => {
  const [optionSearch, setOptionSearch] = useState("invoice");
  return (<Card>
    <Row type="flex" justify="space-between">
      <Col>
        <span className="label-filter">Filter </span>
        <Select
          defaultValue="laut"
          style={{ width: 120 }}
          onChange={value => props.onChangeFilter(value)}
        >
          <Option value="udara">By Air</Option>
          <Option value="laut">By Sea</Option>
        </Select>
      </Col>
      <Col>
        <InputGroup compact>
          <Select style={{width:150}} value={optionSearch} onChange={value => setOptionSearch(value)} size="large">
            <Option value="invoice">No. Invoice</Option>
            <Option value="name">Supplier Name</Option>
            <Option value="code">Supplier Code</Option>
          </Select>
          <Search
            placeholder="input search text"
            onSearch={value => props.onSearch({optionSearch: optionSearch,query : value})}
            style={{ width: 500 }}
            size="large"
          />
        </InputGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <span className="label-total">Total Orders : {props.totalRecord}</span>
      </Col>
    </Row>
  </Card>)
};

HeaderOrder.propTypes = {
  data: PropTypes.arrayOf(Object)
};

export default HeaderOrder;
