import { apiGetWithToken, apiPostWithToken, apiPutWithToken, apiDeleteWithToken } from "../../services/api";
import { PATH_QUESTION_ANSWER } from "../../services/path/questionAnswer";

async function get(props) {
    const loading = props && props.loading ? props.loading : function() {};
    let id = props.id
    let response = "";
    loading(true);
    try {
        response = await apiGetWithToken(`${PATH_QUESTION_ANSWER.GET_BY_ID_QUESTION_ANSWER}/${id}`);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

async function create(props) {
    const loading = props && props.loading ? props.loading : function() {};
    let params = props.params
    let id = props.id
    let response = "";
    loading(true);
    try {
        response = await apiPostWithToken(`${PATH_QUESTION_ANSWER.GET_BY_ID_QUESTION_ANSWER}/${id}`,params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

async function update(props) {
    const loading = props && props.loading ? props.loading : function() {};
    let params = props.params
    let response = "";
    loading(true);
    try {
        response = await apiPutWithToken(`${PATH_QUESTION_ANSWER.GET_QUESTION_ANSWER}`,params);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

async function remove(props) {
    const loading = props && props.loading ? props.loading : function() {};
    let id = props.id
    let response = "";
    loading(true);
    try {
        response = await apiDeleteWithToken(`${PATH_QUESTION_ANSWER.GET_QUESTION_ANSWER}/${id}`);
        loading(false);
        return response;
    } catch (error) {
        loading(false);
        return error; 
    }
}

const QuestionAnswer = {
    get: get,
    create : create,
    update : update,
    remove : remove
}

export default QuestionAnswer;