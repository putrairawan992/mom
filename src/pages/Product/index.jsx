import React, { useState } from 'react';
import FormProduct from '../../containers/Form';
import {apiGetWithoutToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import ProductList from '../../containers/ProductList';
import ProductContext from '../../context/product-context';

const Product = () => {
  const [dataProduct, setDataProduct] = useState(null)
  const [status,setStatus] = useState(true)
  const [labelButton, setLabelButton] = useState("")
  const [loading, setLoading] = useState(false)
  const toFormEdit = async() => {
    setLoading(true)
    try {
      const response = await apiGetWithoutToken(PATH_PRODUCT.GET_BY_ID + '6122e98c-743a-4280-ad15-40fe3c9891af',)
      const respponseProduct = response.data.data
      setDataProduct(respponseProduct)
      setLabelButton("Edit Product")
      setStatus(false)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setDataProduct([])
    }
  }

  const toFormCreate = () => {
    setStatus(false)
    setLabelButton("Add Product")
  }

  return (
    <React.Fragment>
        {
          status ?
          <ProductList
            toFormCreate={toFormCreate}
            toFormEdit={toFormEdit}
            loading={loading}
          /> :
          <ProductContext.Provider> 
            <FormProduct
              dataProduct={dataProduct}
              labelButton={labelButton}
            />
          </ProductContext.Provider>
        }
   
      
    </React.Fragment>
  )
}

export default Product