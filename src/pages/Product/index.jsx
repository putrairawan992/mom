import React, { useState, useContext } from 'react';
import FormProduct from '../../containers/Form';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import ProductList from '../../containers/ProductList';
import ProductContext from '../../context/GlobalStateProduct/product-context'

const Product = () => {
  const context = useContext(ProductContext)
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
        {
          context.status ?
          <ProductList
            toFormCreate={toFormCreate}
            toFormEdit={toFormEdit}
          /> :
          <FormProduct
            dataProduct={dataProduct}
            labelButton={labelButton}
          />
        }
      </React.Fragment>
  )
}

export default Product