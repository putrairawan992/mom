import {PATH_CATEGORY} from '../../services/path/category';
import { apiGetWithoutToken, apiDeleteWithToken } from "../../services/api";

async function GetAll(props) {
    const loading = props && props.loading ? props.loading : function() {};
    
    let response = "";
    loading(true);
    try {
        response = await apiGetWithoutToken(PATH_CATEGORY.ALL_CATEGORY);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

const Category =  {
    getAll: GetAll,
}

export default Category;