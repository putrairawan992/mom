import axios from "axios";
const REACT_APP_API_MAIN_SERVICE = process.env.REACT_APP_API_MAIN_SERVICE;
const REACT_APP_API_DUMMY_SERVICE = process.env.REACT_APP_API_DUMMY_SERVICE;

const token = localStorage.getItem("accessToken");
const tokenDummy = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVJZCI6IjIyZjExMGY1LWM5ZWEtNDgyOS1hNGUxLWFhMWNlNzdhMTFlMCIsImF1ZCI6WyJtdy9tb25nZ29wZXNlbkFwcCIsIm1zL3N1cGVyYWRtaW4iLCJtcy91c2VyIl0sInVzZXJfbmFtZSI6ImN1c3RvbWVyQG1vbmdnb3Blc2VuLmNvbSIsInNjb3BlIjpbIndyaXRlIiwicmVhZCIsInRydXN0Il0sImV4cCI6MTU5OTIwNTM3MSwiYXV0aG9yaXRpZXMiOlsiMjJmMTEwZjUtYzllYS00ODI5LWE0ZTEtYWExY2U3N2ExMWUwIiwiQ1VTIl0sImp0aSI6IjBjNGE1NjRkLWNkZDQtNGU1Yy04ZDkwLTY5ZWFkZDEwNDk2ZiIsImVtYWlsIjoiY3VzdG9tZXJAbW9uZ2dvcGVzZW4uY29tIiwiY2xpZW50X2lkIjoibW9uZ2dvcGVzZW5BcHAifQ.XdeWggtpAwamAEnSHvpmgm1KWGpPzdxhU0seszsvOz0jM403MCWi3spn-Cc7GhxNRE-OPmu2OR7xZt_9sAKUEyivCa1zr-7DDrnMDTg7MDIxdNJu5GFwojRarmDkNUqgltQ98kUL_G5GhDt1iZvaxvMLQNNQ2Ap27o2yahCQg9zdNbQNq-Q42Kfl7NAgkTzC4QQ2h90jJrk5SF-7UZ_YIh3IKTayhCCgwM2n7XvH3ueM_ZyLOv067nB0ADMpVN8m-Ou69iPFLizpmm4yEGsw3qTgtILuxUvPLCfVDsepLznNY20qs99YMwlarbIk8zWgviebkZimUju-7ISydYgphg";

export const serviceMainWithToken = axios.create({
  baseURL: REACT_APP_API_MAIN_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
    Authorization: "Bearer " + token
  }
});

export const serviceMainWithoutToken = axios.create({
  baseURL: REACT_APP_API_MAIN_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`
  }
});

export const serviceDummyWithToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${tokenDummy}`
  }
});

export const serviceDummyWithoutToken = axios.create({
  baseURL: REACT_APP_API_DUMMY_SERVICE,
  timeout: 60 * 4 * 1000,
  headers: {
    Authorization: "Bearer " + token
  }
});