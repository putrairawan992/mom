import React, { useEffect, useState } from "react";
import FormProduct from "../../containers/FormProduct";
import {apiPutWithToken} from '../../services/api';
import {PATH_PRODUCT} from '../../services/path/product';
import {useRootContext} from "../../hoc/RootContext";

const ProductEdit = (props)=> {
    const { history} = useRootContext();
    const [id, setId] = useState('')
    useEffect(() => {
        const idProduct = props.match.params.id
        setId(idProduct)
    },[])

    const editProduct = async function (payload, resetForm) {
        try {
            const response = await apiPutWithToken(PATH_PRODUCT.CREATE, payload)
            resetForm({})
            history.push('/product')
            console.log({success : response})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            {
                id && 
                <FormProduct 
                    id={id}
                    actionSave={(payload, resetForm) => editProduct(payload, resetForm)}
                />
            }
        </React.Fragment>
    )
}

export default ProductEdit;