import { PATH_PRODUCT } from "../../services/path/product";
import { apiGetWithoutToken, apiDeleteWithToken, apiPostWithToken, apiPutWithToken } from "../../services/api";
import jmespath from "jmespath";
import request from './request/product';

async function get(props) {
    const loading = props.loading ? props.loading : function () { };
    const productId = props.productId;
    let response = ""
    loading(true)
    try {
        response = await apiGetWithoutToken(`${PATH_PRODUCT.PRODUCT}/${productId}`)
        loading(false);
    } catch (error) {
        loading(false)
        response = error;
    }
    return response;
  };    

async function GetAll(props) {
    const loading = props && props.loading ? props.loading : function() {};
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

async function Add(props) {
    const params = props.params
    let response = ""
    let payloadArray = Object.keys(params.listImages).map(key => {
        return params.listImages[key]
      })
      const filterPayload = payloadArray.filter(pay => {
        return pay.largeUrl
    })
    const tempValues = {...params, listImages : filterPayload}
    const mapper = jmespath.search(tempValues, request);
    try {
        response = await apiPostWithToken(PATH_PRODUCT.CREATE, mapper);
        return response;
    }catch (error) {
        return error
    }
}

async function Edit(props) {
    const params = props.params
    let response = ""
    let payloadArray = Object.keys(params.listImages).map(key => {
        return params.listImages[key]
      })
      const filterPayload = payloadArray.filter(pay => {
        return pay.largeUrl
    })
    const tempValues = {...params, listImages : filterPayload}
    const mapper = jmespath.search(tempValues, request);
    try {
        response = await apiPutWithToken(PATH_PRODUCT.CREATE, mapper)
        return response
    } catch (error) {
        return error
    }
}

const Product =  {
    get: get,
    getAll: GetAll,
    delete: Delete,
    add : Add,
    edit : Edit
}

export default Product;