import React from "react";
import FormProduct from "../../containers/FormProduct";
import {useRootContext} from "../../hoc/RootContext";
import Product from "../../repository/Product"

export default function ProductCreate() {
    const { history} = useRootContext();
    const createProduct = async function (values) {
        const request = await Product.add({params: values})
        if(request.status === 200) {
            history.push('/product')
        }else{
            return request
        }
    }

    return (
        <FormProduct
            actionSave={(payload,values) => createProduct(payload, values)}
        />
    )
   
}