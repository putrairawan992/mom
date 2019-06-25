import dispatchType from './dispatchType';
//import { apiPostWithoutToken } from '../../services/api';

export const login = (path, payload) => async dispatch => { 
    try{
        //const response = await apiPostWithoutToken(path, payload);
        //console.log(response);
        localStorage.setItem("accessToken","eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjhlYTNlMjY2LWQ0YjUtNDUyOS04ZjFkLTUzZmNmMmQ0ZDU5ZCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6InN1cEBtb25nZ29wZXNlbi5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiLCJ0cnVzdCJdLCJuYW1lIjoiIiwiZXhwIjoxNjA0NTYwNzM5LCJhdXRob3JpdGllcyI6WyI4ZWEzZTI2Ni1kNGI1LTQ1MjktOGYxZC01M2ZjZjJkNGQ1OWQiLCJTQU0iXSwianRpIjoiNTA2YjQ2OWYtMWFmNS00MDcwLTgyZjctNjZhNDc3MzhkNjNkIiwiZW1haWwiOiJzdXBAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.O3Cm5-wvkmT-rGMXnYNkY5QgTkVDoDnSW2w7WOoEk737FkZJL6X98Xuk4W_PeTmTQc6T6Mlw5EQvAD5w0DzarDvVHVutTnnVCwV1L9VP9Hj3eRlNFi7_J22nYhMvfmb7KRMQZ8ep_-BquLcdHcXZyrc7fl2ZeLlczuCVMzfo3c2OKnGx1yJPDcxU4l8OxyhvtP3d_-ktDjLri9cO8Cv4K_0JVbH32YDtVrKtyZX-9Vcmyw79bBmBar3txVf_u4ParkcSFGByOk30heWR4XPxjNOrOhggUJePrcff9WCMU7ZlxQ10vdexNZuV8_lWl9iUNoXharkGix85g3YvhZ-Uog");
        dispatch(dispatchType.login(payload))
    }catch(error){
        dispatch(dispatchType.loginFailed(error))
    }
    
    //PATH_AUTHENTICATION.LOGIN
}

export const logout = () => async dispatch => {
    dispatch(dispatchType.logout());
}