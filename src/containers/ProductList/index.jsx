import React,{useContext} from 'react';
import Button from '../../components/Button';
import ProductContext from '../../context/GlobalStateProduct/product-context'

const ProductList = (props) => {
  const context = useContext(ProductContext)

  return (
    <React.Fragment>
      <Button onClick={() => props.toFormCreate()}>Create</Button>
      <Button
        // loading={context.loading}
        onClick={() =>{
          props.toFormEdit()
          context.getProductById()
        }}
      >Edit</Button>
      <Button onClick={() => context.getProductById()}>Tes Context</Button>
    </React.Fragment>
  )
}

export default ProductList
