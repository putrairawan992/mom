import React, { useReducer, useContext } from "react";
const RootContext = React.createContext();

const RootContextProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: "false",
    body: {}
  };
  const prevAuthenticated = window.localStorage.getItem("authenticated") || initialState;
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: true,
          body: action.payload
        };
      case "logout":
        return {
          ...state,
          isAuthenticated: false,
          body: action.payload
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, prevAuthenticated);
  return (
    <RootContext.Provider
      value={{
        ...state,
        handleLogin: (payload) =>
          dispatch({
            type: "login",
            payload: payload
          }),
        handleLogout: (payload) =>
          dispatch({
            type: "logout",
            payload: payload
          })
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
const useRootContext = ()=> useContext(RootContext);
export default RootContextProvider;
export {RootContext, useRootContext};