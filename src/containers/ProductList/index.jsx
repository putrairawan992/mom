import React, { Fragment, useState, useEffect, useContext } from "react";
import { Card, Table, Select, Icon, Input, Pagination } from "antd";
import { PATH_PRODUCT } from "../../services/path/product";
import { apiGetWithoutToken, apiDeleteWithToken } from "../../services/api";
import { filterCategoryOption } from "../../dataSource/option_category";
import { filterOption } from "../../dataSource/option_filter";
import { sortOption as sort } from "../../dataSource/option_sort";
import Button from "../../components/Button";
import { currencyYuan } from "../../helpers/currency";
import ProductContext from "../../context/GlobalStateProduct/product-context";
import "./style.sass";
import ModalConfirm from "../../containers/ModalConfirm";

const { Option } = Select;
const { Search } = Input;
const sortOption = sort.product;
const filterProductOption = filterOption.product;

const Products = props => {
  const context = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [path, setPath] = useState(PATH_PRODUCT.PRODUCT);
  const [category, setCategory] = useState("");
  const pageSize = 5;
  const [total, setTotal] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectProduct, setSelectProduct] = useState({
    id: "",
    image: "",
    nameIdn: "",
    nameCny: "",
    priceCny: ""
  });
  const [parameter, setParameter] = useState({
    sortBy: "creationDate",
    direction: "desc",
    filterBy: "",
    keyword: "",
    limit: pageSize,
    page: 0
  });

  useEffect(() => {
    getListProduct();
  }, []);

  useEffect(() => {
    getListProduct();
  }, [parameter]);

  useEffect(() => {
    getListProduct();
  }, [path]);

  useEffect(() => {
    setPathProductCategory();
  }, [category]);

  const schemaProducts = ({
    id,
    image,
    nameChinese,
    name,
    basePrice,
    supplierName,
    isReadyStock
  }) => ({
    id: id,
    image: image.defaultImage,
    nameCny: nameChinese,
    nameIdn: name,
    priceCny: currencyYuan(basePrice),
    supplier: supplierName,
    stock: isReadyStock ? "Ready Stock" : "Out of Stock"
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
          <div className="mp-icon-container">
            <div
              className="mp-icon-wrap"
              onClick={() => {
                context.toFormEdit(record.id);
              }}
            >
              <Icon className="mp-icon-product-action" type="edit" />
            </div>
            <div
              className="mp-icon-wrap"
              onClick={() => {
                setSelectProduct(record);
                //console.log(response.data.data.find(data)=> data);
                setShowDeleteConfirm(!showDeleteConfirm);
              }}
            >
              <Icon className="mp-icon-product-action" type="delete" />
            </div>
          </div>
        </span>
      )
    }
  ];

  const getListProduct = async () => {
    setLoading(true);
    try {
      const response = await apiGetWithoutToken(`${path}`, parameter);
      setTotal(response.data.element);
      setListProduct(convertToSchemaProduct(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setListProduct(null);
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const response = await apiDeleteWithToken(`${path}/${selectProduct.id}`);
      setLoading(false);
      setShowDeleteConfirm(!showDeleteConfirm);
      response && getListProduct();
    } catch (error) {
      console.error(error);
      setLoading(false);
      setShowDeleteConfirm(!showDeleteConfirm);
    }
  };

  const setPathProductCategory = () => {
    if (category === "") {
      setPath(PATH_PRODUCT.PRODUCT);
    } else {
      setPath(`${PATH_PRODUCT.CATEGORY}/${category}`);
    }
  };

  const actionChangePagination = value => {
    setParameter({ ...parameter, page: value - 1 });
  };

  const actionSort = value => {
    const sort = JSON.parse(value);
    setParameter({
      ...parameter,
      sortBy: sort.value,
      direction: sort.direction
    });
  };

  const actionFilterCategory = value => {
    setCategory(JSON.parse(value).value);
    setPathProductCategory();
  };

  const actionFilterProduct = value => {
    const filter = JSON.parse(value);
    setParameter({ ...parameter, filterBy: filter.value, page: 0 });
  };

  const actionSearch = value => {
    const keyword = value;
    setParameter({ ...parameter, keyword: keyword, page: 0 });
  };

  const descDeleteConfirmation = () => (
    <table border={0} style={{ fontSize: 12 }}>
      <tbody>
        <tr>
          <td rowSpan={4}>
            <img
              src={selectProduct.image}
              alt={selectProduct.nameIdn}
              style={{ width: 50, height: 50 }}
            />
          </td>
          <td>
            <span style={{ paddingLeft: 12 }}>{selectProduct.supplier}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ paddingLeft: 12 }}>{`${selectProduct.nameCny} - ${
              selectProduct.nameIdn
            }`}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ paddingLeft: 12 }}>{selectProduct.priceCny}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ paddingLeft: 12 }}>{selectProduct.stock}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <Fragment>
      <div className="mp-container-title-product">
        <span>Product List</span>
        <Button onClick={() => context.toFormCreate()}>Add Product +</Button>
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
                  value={JSON.stringify({ value: category.value })}
                >
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
          dataSource={listProduct}
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
          onChange={page => actionChangePagination(page)}
        />
      </Card>
      <ModalConfirm
        title={"Delete Product"}
        description={descDeleteConfirmation()}
        onCancel={() => setShowDeleteConfirm(!showDeleteConfirm)}
        visible={showDeleteConfirm}
        onOk={deleteProduct}
        loading={loading}
      />
    </Fragment>
  );
};

export default Products;
