import React,{useState} from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Select, Input } from "antd";
import "./style.sass";

const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const HeaderOrder = props => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAllInvoice, setIsAllInvoice] = useState(true);
  const [placehoder, setPlaceholder] = useState("input search text");
  return (<Card>
    <Row type="flex" justify="space-between">
      <Col>
        <span className="label-filter">Filter </span>
        <Select
          defaultValue="sea"
          className="mp-select-option-default mp-select-filter"
          onChange={value => props.onChangeFilter(value)}
        >
          <Option value="air">By Air</Option>
          <Option value="sea">By Sea</Option>
        </Select>
      </Col>
      <Col>
        <InputGroup compact>
          <Select className="mp-select-option-default mp-select-search" defaultValue="invoice_number" onChange={value => props.onChangeCategory(value)} size="large">
            <Option value="invoice_number">No. Invoice</Option>
            <Option value="supplier_name">Supplier Name</Option>
            <Option value="supplier_code">Supplier Code</Option>
          </Select>
          <Search
            placeholder={placehoder}
            onSearch={value => {
                (isAllInvoice && value? 
                setPlaceholder("Press enter to show all order..") :
                setPlaceholder("input search text.."))
                setIsAllInvoice(!isAllInvoice);
                setSearchKeyword("");
                props.onSearch(value)
              }
            }
            id="text-search"
            style={{width:500}}
            className="mp-search-default"
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
