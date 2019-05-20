import dispatchType from './dispatchType';
import { apiPostWithoutToken } from '../../services/api';

export const login = (path, payload) => async dispatch => { 
    try{
        //const response = await apiPostWithoutToken(path, payload);
        //console.log(response);
        console.log(path);
        
        dispatch(dispatchType.login())
    }catch(error){
        dispatch(dispatchType.loginFailed(error))
    }
    
    //PATH_AUTHENTICATION.LOGIN
}