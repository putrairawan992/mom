import React from "react";
import FormProduct from "../../containers/FormProduct";
import {apiPostWithToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import {useRootContext} from "../../hoc/RootContext";

export default function ProductCreate() {
    const { history} = useRootContext();
    const createProduct = async function (payload, resetForm) {
        try {
            const response = await apiPostWithToken(PATH_PRODUCT.CREATE ,payload)
            resetForm({})
            history.push('/product')
            console.log({success: response})
        } catch (error) {
            console.log({error})
        }
    }

    return (
        <FormProduct
            actionSave={(payload) => createProduct(payload)}
        />
    )
   
}