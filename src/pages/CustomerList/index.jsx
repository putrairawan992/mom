import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, Table, Select, Input, Pagination, Tag } from "antd";
import { filterOption as filter } from "../../dataSource/option_filter";
import { sortOption as sort } from "../../dataSource/option_sort";
import "./style.sass";
import convertTimesTime from "../../helpers/convertTimestime";
import customer from "../../repository/customer";
import schema from './schema';

const { Option } = Select;
const { Search } = Input;
const filterOption = filter.customer;
const sortOption = sort.customer;

export default function CustomerList(){
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [parameter, setParameter] = useState(schema);

  const isInitialRender = useRef(true);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    isInitialRender.current ? isInitialRender.current = false : getList();
  }, [parameter]);

  function schemaList({ id, name, email, createdDate, status }){
    return {
      id: id,
      name: name,
      email: email,
      createdDate: convertTimesTime.TypeMillisecondWithoutSecond(createdDate),
      status: status
    }
  }

  function convertToSchema(response){
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
          return <Tag color="green">Confirmed</Tag>;
        } else if (text.status === "VRFI") {
          return <Tag color="red">Not Yet Confirmed</Tag>;
        }
      }
    }
  ];

  async function getList(){
    let response = await customer.getAll({
      param: parameter, 
      loading: loading
    })
    if(response.status === 200){
      setTotal(response.data.element);
      setList(convertToSchema(response));
      setLoading(false);
    }else{
      setList(null);
      setLoading(false);
    }
  };

  function actionChangePagination(value){
    setParameter({
      ...parameter,
      page: value-1
    });
  }

  function actionSort(value){
    const sort = JSON.parse(value);
    setParameter({
      ...parameter,
      sortBy: sort.value,
      direction: sort.direction
    });
  };

  function actionFilterProduct(value){
    const filter = JSON.parse(value);
    setParameter({ ...parameter, status: filter.value, page: 0 });
  };

  function actionSearch(value){
    const keyword = value;
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
          pageSize={schema.limit}
          defaultCurrent={1}
          onChange={(page)=>actionChangePagination(page)}
        />
      </Card>
    </Fragment>
  );
};