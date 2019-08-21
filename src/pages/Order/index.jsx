import React from 'react';
import { useRootContext } from '../../hoc/RootContext';
import OrderChina from '../OrderChina';
import OrderIndonesia from '../OrderIndonesia';

const Order = ()=> {
  const {body} = useRootContext();
  return(
    <React.Fragment>
      {body && (body.role === "china" ? <OrderChina/> : <OrderIndonesia/>)} 
    </React.Fragment>
  )
}

export default Order;