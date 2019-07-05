import TYPE from "./type";

const login = (payload) => {
  return {
    type: TYPE.LOGIN,
    payload: payload
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

const needResponse = (invoice,total) => {
  return {
    type : TYPE.NEED_RESPONSE,
    invoice: invoice,
    total: total
  }
}
const needPurchase = (invoice,total) => {
  return {
    type : TYPE.NEED_PURCHASE,
    invoice: invoice,
    total: total
  }
}
const purchased = (invoice,total) => {
  return {
    type : TYPE.PURCHASED,
    invoice: invoice,
    total: total
  }
}
const readyToShip = (invoice,total) => {
  return {
    type : TYPE.READY_TO_SHIP,
    invoice: invoice,
    total: total
  }
}

const shipped = (invoice,total) => {
  return {
    type : TYPE.SHIPPED,
    invoice: invoice,
    total: total
  }
}

const dispatchType = {
  login: login,
  loginFailed: loginFailed,
  logout: logout,
  logoutFailed: logoutFailed,
  needResponse: needResponse,
  needPurchase: needPurchase,
  purchased: purchased,
  readyToShip: readyToShip,
  shipped: shipped
};

export default dispatchType;