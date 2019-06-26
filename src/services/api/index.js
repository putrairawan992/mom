import {
  serviceWithToken,
  serviceWithoutToken
} from "./httpClient";

/** Service With Token */
export const apiGetWithToken = (url, params) => {
  return serviceWithToken().get(url, {
    params: params
  });
};

export const apiPostWithToken = (url, params) => {
  return serviceWithToken().post(url, params)
};

export const apiPatchWithToken = (url, params) => {
  return serviceWithToken().patch(url, params);
};

export const apiPutWithToken = (url, params) => {
  return serviceWithToken().put(url, params);
};

export const apiDeleteWithToken = url => {
  return serviceWithToken().delete(url);
};

/** Service Without Token */
export const apiGetWithoutToken = (url, params = null) => {
  return serviceWithoutToken().get(url, {
    params: params
  });
};

export const apiPostWithoutToken = (url, params) => {
  return serviceWithoutToken().post(url, params);
};

export const apiPatchWithoutToken = (url, params) => {
  return serviceWithoutToken().patch(url, params);
};

export const apiPutWithoutToken = (url, params) => {
  return serviceWithoutToken().put(url, params);
};

export const apiDeleteWithoutToken = url => {
  return serviceWithoutToken().delete(url);
};