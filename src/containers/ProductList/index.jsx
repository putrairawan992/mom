import React from 'react';
import Button from '../../components/Button';

const ProductList = (props) => {
  return (
    <React.Fragment>
      <Button onClick={() => props.toFormCreate()}>Create</Button>
      <Button
        loading={props.loading}
        onClick={() =>props.toFormEdit()}
      >Edit</Button>
    </React.Fragment>
  )
}

export default ProductList
