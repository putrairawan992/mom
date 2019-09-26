import React, { useState, useEffect, useRef } from "react";
import { Card, Table, Select, Input } from "antd";
import { filterCategoryOption } from "../../dataSource/option_category";
import { filterOption } from "../../dataSource/option_filter";
import { sortOption as sort } from "../../dataSource/option_sort";
import ButtonIcon from "../../components/ButtonIcon";
import Product from "../../repository/Product";
import { Link } from "react-router-dom";
import PATH_URL from "../../routers/path";
import "./style.sass";


const { Option } = Select;
const { Search } = Input;
const sortOption = sort.product;
const filterProductOption = filterOption.product;

export default function QuestionAnswer(props) {
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState("");
  const pageSize = 5;
  const [total, setTotal] = useState(0);

  const [parameter, setParameter] = useState({
    sortBy: "creationDate",
    direction: "desc",
    filterBy: "",
    keyword: "",
    limit: pageSize,
    page: 0
  });

  const isInitialRender = useRef(true);
  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    isInitialRender.current ? isInitialRender.current = false : getProductList()
  }, [parameter, category]);

  const schemaTableProduct = ({
    id,
    image,
    nameChinese,
    name,
    supplierName
  }) => ({
    id: id,
    image: image.defaultImage,
    nameCny: nameChinese,
    nameIdn: name,
    supplier: supplierName
  });

  function convertToSchemaTableProductList(productListResponse) {
    const productListData = productListResponse.data.data;
    return productListData.map(product => schemaTableProduct(product));
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
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 200
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, product) => (
        <span className="mp-table-product-action">
          <div className="mp-icon-container">
            <Link to={`${PATH_URL.QUESTION_ANSWER}/${product.id}`}>
            <ButtonIcon icon="wechat" />
            </Link>
          </div>
        </span>
      )
    }
  ];

  async function getProductList() {
    let productListResponse = await Product.getAll({
      param: parameter,
      loading: setLoading,
      category
    });

    if (productListResponse.status === 200) {
      setTotal(productListResponse.data.element);
      setProductList(convertToSchemaTableProductList(productListResponse));
    } else {
      setProductList(null);
    }
  };

  function actionChangePagination(value) {
    setParameter({ ...parameter, page: value - 1 })
    setCurrentPage(value)
  };

  function actionSort(value) {
    const sort = JSON.parse(value);
    setParameter({
      ...parameter,
      sortBy: sort.value,
      direction: sort.direction
    });
  };

  function actionFilterCategory(value) {
    setCategory(JSON.parse(value).value);
  };

  function actionFilterProduct(value) {
    const filter = JSON.parse(value);
    setParameter({ ...parameter, filterBy: filter.value, page: 0 });
  };

  function actionSearch(value) {
    const keyword = value;
    setParameter({ ...parameter, keyword: keyword });
    setCurrentPage(0)
  };


  const sortList = JSON.stringify({
    value: sortOption[0].value,
    direction: sortOption[0].direction
  });

  function sortName(sort) {
    return JSON.stringify({
      value: sort.value,
      direction: sort.direction
    });
  }


  return (
    <div className="mp-question-answer">
      <div className="mp-container-title-product">
          <h2>Product Questions</h2>
      </div>
      <Card>
        <div className="mp-container-header-table">
          <div className="mp-container-title-select">
            <span className="mp-span-title-select">Sort</span>
            <Select
              defaultValue={sortList}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionSort}
            >
              {sortOption.map(sort => (
                <Option
                  key={sort.value}
                  value={sortName(sort)}>
                  {sort.name}
                </Option>
              ))}
            </Select>
            <span style={{ marginRight: 48 }} />
            <span className="mp-span-title-select">Filter</span>
            <Select
              defaultValue={filterCategoryOption[0].name}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionFilterCategory}
            >
              {filterCategoryOption.map(category => (
                <Option
                  key={category.value}
                  value={JSON.stringify({ value: category.value })}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Select
              defaultValue={filterProductOption[0].name}
              style={{ width: 200 }}
              className="mp-select-product-list"
              onChange={actionFilterProduct}
            >
              {filterProductOption.map(product => (
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
          dataSource={productList}
          pagination={{
            defaultPageSize: pageSize,
            current: currentPage,
            onChange: actionChangePagination,
            className: 'pagination-product-forum',
            total: total
          }}
        />
      </Card>
    </div>
  );
};
