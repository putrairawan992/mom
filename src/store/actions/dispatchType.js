import TYPE from "./type";

const login = () => {
  return {
    type: TYPE.LOGIN
  };
};

const loginFailed = errorData => {
  return {
    type: TYPE.LOGIN_FAILED,
    payload: errorData
  };
};

const logout = () => {
  return {
    type: TYPE.LOGOUT
  };
};

const logoutFailed = errorData => {
  return {
    type: TYPE.LOGIN_FAILED,
    payload: errorData
  };
};

const dispatchType = {
  login: login,
  loginFailed: loginFailed,
  logout: logout,
  logoutFailed: logoutFailed
};

export default dispatchType;