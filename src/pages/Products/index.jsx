import React, { Fragment, useState, useEffect } from "react";
import { Card, Table, Select, Icon, Input } from "antd";
import { PATH_PRODUCT } from "../../services/path/product";
import { apiGetWithoutToken } from "../../services/api";
import { filterCategoryOption } from "../../dataSource/option_category";
import { filterProductOption } from "../../dataSource/option_product";
import { sortOption } from "../../dataSource/option_sort";
import "./style.sass";

const { Option } = Select;
const { Search } = Input;

const Products = props => {
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("desc");
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    getListProduct();
  }, []);

  const schemaProducts = ({ id, image, name, price }) => ({
    id: id,
    image: image.defaultImage,
    nameCny: name,
    nameIdn: name,
    priceCny: price,
    supplier: "Western General Merchandise",
    stock: "Ready Stock"
  });

  const convertToSchemaProduct = response => {
    const products = response.data.data;
    return products.map(product => schemaProducts(product));
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      width: 50,
      render: imageUrl => {
        return (
          <img src={imageUrl} alt="product" style={{ width: 50, height: 50 }} />
        );
      }
    },
    {
      title: "Product Name (CHN)",
      dataIndex: "nameCny",
      key: "nameCny",
      width: 200
    },
    {
      title: "Product Name (IDN)",
      dataIndex: "nameIdn",
      key: "nameIdn",
      width: 200
    },
    {
      title: "Base Price",
      dataIndex: "priceCny",
      key: "priceCny",
      width: 100
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 200
    },
    {
      title: "Stock Status",
      dataIndex: "stock",
      key: "stock",
      width: 150
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <span className="mp-table-product-action">
          <Icon
            className="mp-icon-product-action"
            type="edit"
            onClick={() => alert(record.id)}
          />
          <Icon
            className="mp-icon-product-action"
            type="delete"
            onClick={() => alert(record.id)}
          />
        </span>
      )
    }
  ];

  // const paramProduct = direction => {
  //   return {
  //     direction: direction
  //   };
  // };

  const getListProduct = async (parameter = "") => {
    setLoading(true);
    try {
      const response = await apiGetWithoutToken(
        `${PATH_PRODUCT.PRODUCT}`,
        parameter
      );
      setListProduct(convertToSchemaProduct(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const actionSort = (value) => {
    getListProduct(value);
  };
  const actionFilterCategory = () => {};
  const actionFilterProduct = () => {};

  return (
    <Fragment>
      <div>
        <h1>Product List</h1>
      </div>
      <Card>
        <div className="mp-container-header-table">
          <div className="mp-container-title-select">
            <span className="mp-span-title-select">Sort</span>
            <Select
              defaultValue={`{ "value": ${sortOption[0].value}, "direction": ${sortOption[0].direction} }`}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionSort}
            >
              {sortOption.map(sort => (
                <Option key={sort.value} value={`{ "value": ${sort.value}, "direction": ${sort.direction} }`}>
                  {sort.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mp-container-title-select">
            <span className="mp-span-title-select">Filter</span>
            <Select
              defaultValue={filterCategoryOption[0].value}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionFilterCategory}
            >
              {filterCategoryOption.map(category => (
                <Option key={category.value} value={category.value}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              defaultValue={filterProductOption[0].value}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionFilterProduct}
            >
              {filterProductOption.map(product => (
                <Option key={product.value} value={product.value}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
          </div>
        </div>
        <Table
          rowKey={record => record.id}
          columns={columns}
          loading={loading}
          dataSource={listProduct}
        />
      </Card>
    </Fragment>
  );
};

export default Products;
