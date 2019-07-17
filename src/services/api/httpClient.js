import axios from 'axios';
//const ngrok = 'http://a2206ca1.ngrok.io/api/v1/';
const REACT_APP_API_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;
// const REACT_APP_API_SERVICE = 'http://192.168.11.116:8100/api/v1/';
const getToken = () => {
  return localStorage.getItem("accessToken");
}

export const serviceWithToken = (token = getToken()) => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": `application/json`
  }
});

export const serviceWithoutToken = () => axios.create({
  baseURL: REACT_APP_API_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
  }
});