import dispatchType from './dispatchType';
//import { apiPostWithoutToken } from '../../services/api';

export const login = (path, payload) => async dispatch => { 
    try{
        //const response = await apiPostWithoutToken(path, payload);
        //console.log(response);
        localStorage.setItem("accessToken","eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6ImNmZDI3ZDA2LTBiYmMtNGFkZC1iMWJhLTIyMGYzOGE2ODJiYiIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInJvbGUiOlt7ImlkIjo1MDM5LCJzZWN1cmVJZCI6IjFlYjE4ZGRmLTMyNjctNGQ3Ni1iNWZlLWRkZTI4NjQ1NGZmMyIsImNyZWF0aW9uRGF0ZSI6MTU1OTEyMzk5OTI3OSwiY3JlYXRlZEJ5IjoiU1lTVEVNIiwibW9kaWZpY2F0aW9uRGF0ZSI6MTU1OTEyMzk5OTI3OSwibW9kaWZpZWRCeSI6IlNZU1RFTSIsIm5hbWUiOiJBZG1pbiIsImNvZGUiOiJBRE0iLCJkZXNjcmlwdGlvbiI6IkFkbWluIG1vbmdnb3Blc2VuIiwiYWN0aXZhdGVkIjp0cnVlfV0sInVzZXJfbmFtZSI6ImFkbWluY3luQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sIm5hbWUiOiIiLCJleHAiOjE2MDY1MzQ1MjQsImF1dGhvcml0aWVzIjpbIkFETSIsImNmZDI3ZDA2LTBiYmMtNGFkZC1iMWJhLTIyMGYzOGE2ODJiYiJdLCJqdGkiOiI4NDQwMzVlOC1jYTA1LTRhMjAtYmIwNi0zMGE2MGE4N2JhZjIiLCJlbWFpbCI6ImFkbWluY3luQG1vbmdnb3Blc2VuLmNvbSIsImNsaWVudF9pZCI6Im1vbmdnb3Blc2VuQXBwIn0.bYnShVPoJQ6G7jR-hEk_L2wbYa2iM-dg-pW7aNWdlgY1We3ZYT4ktUzGlSi2OFUqsasexifrRUO3zITUrzS_Au-94dmBmZIDb81lqTYyGw5lHLN5uuW1Fa0oEHYE0ED928jEHRiF6OYKgIsm13TyTnDwWYqcnwYJw2KoVjn1y6nDRsymeqBIc_1MCR9aoq6GwuzZjKnLcoPfwg6JSHEmQZNwXT45VgLL9Rzc43TUXVXO1Goqx6ITI7nYOs0-sqNP5CRC48O79ZkZQwGxeEZSzfVTdpS4b6uxvc0Snx0_tHQAkjuPbs_Irm5YFLgStq-OC4n7RbHkHdtl1i95FArEGw");
        dispatch(dispatchType.login(payload))
    }catch(error){
        dispatch(dispatchType.loginFailed(error))
    }
    
    //PATH_AUTHENTICATION.LOGIN
}

export const logout = () => async dispatch => {
    dispatch(dispatchType.logout());
}