import TYPE from "../actions/type";

const initialState = {
  token: [],
  isLoading: false,
  isFinish: false,
  isError: false,
  checkError: false,
  isAuthenticated: false,
  messageError: "",
  statusModal: false,
  customerName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        authority : action.payload.username
      };
    case TYPE.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        messageError: action.payload,
        checkError: true
      };
    case TYPE.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case TYPE.LOGOUT_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        messageError: action.payload,
        checkError: true
      };
    default:
      return state;
  }
};
