import React, { Fragment, useState, useEffect } from "react";
import { Card, Table, Select, Input, Pagination } from "antd";
import { apiGetWithToken } from "../../services/api";
import { filterOption as filter } from "../../dataSource/option_filter";
import { sortOption as sort } from "../../dataSource/option_sort";
import "./style.sass";
import convertTimesTime from "../../helpers/convertTimestime";
import { PATH_CUSTOMER } from "../../services/path/customer";

const { Option } = Select;
const { Search } = Input;
const filterOption = filter.customer;
const sortOption = sort.customer;

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 5;
  const [parameter, setParameter] = useState({
    sortBy: "",
    direction: "",
    filterBy: "",
    keyword: "",
    limit: pageSize,
    page: 0
  });

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [parameter]);

  const schemaList = ({ id, name, email, createdDate, status }) => ({
    id: id,
    name: name,
    email: email,
    createdDate: convertTimesTime.TypeMillisecondWithoutSecond(createdDate),
    status: status
  });

  const convertToSchema = response => {
    const list = response.data.data;
    return list.map(data => schemaList(data));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200
    },
    {
      title: "Costumer Since",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150
    },
    {
      title: "Email Confirmation",
      key: "status",
      width: 100,
      render: text => {
        if (text.status === "ACTV") {
          return <span>Confirmed</span>;
        } else if (text.status === "VRFI") {
          return <span>Not Yet Confirmed</span>;
        }
      }
    }
  ];

  const getList = async () => {
    setLoading(true);
    try {
      const response = await apiGetWithToken(
        `${PATH_CUSTOMER.LIST}`,
        parameter
      );
      console.log(response);
      setTotal(response.data.element);
      setList(convertToSchema(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setList(null);
      setLoading(false);
    }
  };

  const actionChangePagination = (value)=> {
    setParameter({
      ...parameter,
      page: value-1
    });
  }

  const actionSort = value => {
    const sort = JSON.parse(value);
    setParameter({
      ...parameter,
      sortBy: sort.value,
      direction: sort.direction
    });
  };

  const actionFilterProduct = value => {
    const filter = JSON.parse(value);
    setParameter({ ...parameter, filterBy: filter.value, page: 0 });
  };

  const actionSearch = value => {
    const keyword = value;
    console.log(keyword)
    setParameter({ ...parameter, keyword: keyword, page: 0  });
  };

  return (
    <Fragment>
      <div className="mp-container-title-product">
        <span>Customer List</span>
      </div>
      <Card>
        <div className="mp-container-header-table">
          <div className="mp-container-title-select">
            <span className="mp-span-title-select">Sort</span>
            <Select
              defaultValue={JSON.stringify({
                value: sortOption[0].value,
                direction: sortOption[0].direction
              })}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionSort}
            >
              {sortOption.map(sort => (
                <Option
                  key={sort.value}
                  value={JSON.stringify({
                    value: sort.value,
                    direction: sort.direction
                  })}
                >
                  {sort.name}
                </Option>
              ))}
            </Select>
            <span style={{marginRight: 48}}/>
            <span className="mp-span-title-select">Filter</span>
            <Select
              defaultValue={filterOption[0].name}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionFilterProduct}
            >
              {filterOption.map(product => (
                <Option
                  key={product.value}
                  value={JSON.stringify({ value: product.value })}
                >
                  {product.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Search
              placeholder="input search text"
              onSearch={value => actionSearch(value)}
              style={{ width: 300 }}
            />
          </div>
        </div>
        <Table
          rowKey={record => record.id}
          columns={columns}
          loading={loading}
          dataSource={list}
          pagination={false}
        />
        <Pagination
          className="mp-pagination-table"
          total={total}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(page)=>actionChangePagination(page)}
        />
      </Card>
    </Fragment>
  );
};

export default Customers;
