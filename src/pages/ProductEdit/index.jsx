import React, { useEffect, useState } from "react";
import FormProduct from "../../containers/FormProduct";
import {useRootContext} from "../../hoc/RootContext";
import Product from "../../repository/Product"

const ProductEdit = (props)=> {
    const { history} = useRootContext();
    const [id, setId] = useState('')
    useEffect(() => {
        const idProduct = props.match.params.id
        setId(idProduct)
    },[props.match.params.id])

    const editProduct = async function (payload) {
        const request = await Product.edit({params : payload})
        if(request.status === 200) {
            history.push('/product')
        }else{
            return request
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