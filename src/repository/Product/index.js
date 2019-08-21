import { PATH_PRODUCT } from "../../services/path/product";
import { apiGetWithoutToken, apiDeleteWithToken } from "../../services/api";

async function GetAll(props) {
    const loading = props.loading ? props.loading : function() {};
    const param = props.param;
    const category = props.category ? props.category : "";

    let response = "";
    loading(true);
    try {
        if(category === "") {
            response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, param);
        } else {
            response = await apiGetWithoutToken(`${PATH_PRODUCT.CATEGORY}/${category}`, param);
        }
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

async function Delete(props) {
    const loading = props.loading ? props.loading : function() {};
    const id = props.id;

    let response = "";
    loading(true);
    try {
        response = await apiDeleteWithToken(`${PATH_PRODUCT.PRODUCT}/${id}`);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

const Product =  {
    getAll: GetAll,
    delete: Delete
}

export default Product;