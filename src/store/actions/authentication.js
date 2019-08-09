import dispatchType from './dispatchType';
//import { apiPostWithoutToken } from '../../services/api';

export const login = (path, payload) => async dispatch => { 
    try{
        //const response = await apiPostWithoutToken(path, payload);
        //console.log(response);
        localStorage.setItem("accessToken","eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjU3NGFlMjQ1LTA2YzAtNDlhZS1iNGQzLTMzOTI0MjIzYTY1MiIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInJvbGUiOlt7ImlkIjoxOCwic2VjdXJlSWQiOiJjMTI3ZjIxNi01ZGQ5LTQ0M2EtYmM2ZC04ZWJiMDVjOThhOTYiLCJjcmVhdGlvbkRhdGUiOjE1NjMyNTg3MTAzNjYsImNyZWF0ZWRCeSI6IlNZU1RFTSIsIm1vZGlmaWNhdGlvbkRhdGUiOjE1NjMyNTg3MTAzNjYsIm1vZGlmaWVkQnkiOiJTWVNURU0iLCJuYW1lIjoiQWRtaW4iLCJjb2RlIjoiQURNIiwiZGVzY3JpcHRpb24iOiJBZG1pbiBtb25nZ29wZXNlbiIsImFjdGl2YXRlZCI6dHJ1ZX1dLCJ1c2VyX25hbWUiOiJhZG1pbkBtYWlsaW5hdG9yLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sIm5hbWUiOiJtdWtsaXMtMDdfMjZfMjAxOV8xNF8wOF8zMyIsImV4cCI6MTYwODM1OTg4NywiYXV0aG9yaXRpZXMiOlsiQURNIiwiNTc0YWUyNDUtMDZjMC00OWFlLWI0ZDMtMzM5MjQyMjNhNjUyIl0sImp0aSI6IjU0YTllNTI0LTM2OTEtNGZjOC1hMzg2LTUwNzI1NTg0MDk0YiIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJjbGllbnRfaWQiOiJtb25nZ29wZXNlbkFwcCJ9.VG_-s842iYRW32Kr_gTCmmaBsW2Qk7b9nvEz-qPBXQRZw4dDXNYZE_GCaI_lc5s2J7tvA7FxbFUjyvqyWy-JuxQyyhKwLt4t4pPpOtr3igbAWNfJjtaEitj3LDCyq0mCcKic1aUIx7N1_E48BF6AlDx4M-NKq7LpVuntVJjdx_43ncY1kwrxg7BEb5McU9sk07TukNVWBe6USOO1dcQJDDiVoszltUOOQQoAuyH6QNzDkDvTM2cOGa1PziLu-vTTe2UGKn9bXd6EaUbMOmHc9VhvC041vlShKf07ZdA5n8adEIbjic2NUx_HOKXL68iNxz8QlypbJ42wKaZVeOlE8w");
        dispatch(dispatchType.login(payload))
    }catch(error){
        dispatch(dispatchType.loginFailed(error))
    }
}

export const logout = () => async dispatch => {
    dispatch(dispatchType.logout());
}