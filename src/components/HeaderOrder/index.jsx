import React,{useState} from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Select, Input } from "antd";
import "./style.sass";

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const HeaderOrder = props => {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (<Card>
    <Row type="flex" justify="space-between">
      <Col>
        <span className="label-filter">Filter </span>
        <Select
          defaultValue="laut"
          style={{ width: 120 }}
          onChange={value => props.onChangeFilter(value)}
        >
          <Option value="air">By Air</Option>
          <Option value="sea">By Sea</Option>
        </Select>
      </Col>
      <Col>
        <InputGroup compact>
          <Select style={{width:150}} defaultValue="invoice_number" onChange={value => props.onChangeCategory(value)} size="large">
            <Option value="invoice_number">No. Invoice</Option>
            <Option value="supplier_name">Supplier Name</Option>
            <Option value="supplier_code">Supplier Code</Option>
          </Select>
          <Search
            placeholder="input search text"
            onSearch={value => {
                setSearchKeyword("");
                props.onSearch(value)
              }
            }
            id="text-search"
            style={{ width: 500 }}
            size="large"
            value={searchKeyword}
            onChange={event => {
              setSearchKeyword(event.target.value);
              props.onChangeQuery(event.target.value)
              }
            }
          />
        </InputGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <span className="label-total">Total Orders : {props.total}</span>
      </Col>
    </Row>
  </Card>)
};

HeaderOrder.propTypes = {
  total: PropTypes.number,
  onChangeFilter: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onSearch: PropTypes.func
};

export default HeaderOrder;
