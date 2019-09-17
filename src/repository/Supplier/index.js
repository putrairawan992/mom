import { PATH_SUPPLIER } from "../../services/path/supplier";
import { apiGetWithToken } from "../../services/api";

async function GetAll(props) {
    const loading = props && props.loading ? props.loading : function() {};
    
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(PATH_SUPPLIER.ALL_SUPPLIER);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

const Supplier =  {
    getAll: GetAll,
}

export default Supplier;