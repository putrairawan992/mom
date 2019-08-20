import React, { useState, useContext } from 'react';
import FormProduct from '../../containers/FormProduct';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import ProductList from '../../containers/ProductList';

const Product = () => {
  const [dataProduct, setDataProduct] = useState(null)
  const [labelButton, setLabelButton] = useState("")
  const toFormEdit = () => {
    setLabelButton("Edit Product")
  }

  const toFormCreate = () => {
    setLabelButton("Add Product")
  }

  return (
      <React.Fragment>
        <ProductList
          toFormCreate={toFormCreate}
          toFormEdit={toFormEdit}
        />
      </React.Fragment>
  )
}

export default Product