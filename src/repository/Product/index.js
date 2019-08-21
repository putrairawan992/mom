import { PATH_PRODUCT } from "../../services/path/product";
import { apiGetWithoutToken, apiDeleteWithToken } from "../../services/api";

async function GetAll(parameters, setLoading = function(){}, category = "") {
    let response = "";
    setLoading(true);
    try {
        if(category === "") {
            response = await apiGetWithoutToken(PATH_PRODUCT.PRODUCT, parameters);
        } else {
            response = await apiGetWithoutToken(`${PATH_PRODUCT.CATEGORY}/${category}`, parameters);
        }
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        return error; 
    }
}

async function Delete(id, setLoading = function(){}) {
    let response = "";
    setLoading(true);
    try {
        response = await apiDeleteWithToken(`${PATH_PRODUCT.PRODUCT}/${id}`);
        setLoading(false);
        return response;
    } catch (error) {
        setLoading(false);
        return error; 
    }
}

const Product =  {
    getAll: GetAll,
    delete: Delete
}

export default Product;