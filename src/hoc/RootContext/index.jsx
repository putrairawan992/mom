import React, { useState, useReducer, useContext } from "react";
import { apiPostWithoutToken } from "../../services/api";
import { PATH_AUTHENTICATION } from "../../services/path/login";
const RootContext = React.createContext();

const RootContextProvider = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState = {
    isAuthenticated: false,
    body: {}
  };
  
  const prevAuthenticated =
  JSON.parse(window.localStorage.getItem("authenticated")) || initialState;
  const reducer = (state, action) => {
    //console.log(action);
    switch (action.type) {
      case "login":
        return {
          ...state,
          isAuthenticated: true,
          body: { ...action.payload }
        };
      case "logout":
        return {
          ...state,
          isAuthenticated: false,
          body: null
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, prevAuthenticated);
  const login = async payload => {
    try {
      setIsSubmitting(true);
      const response = await apiPostWithoutToken(
        PATH_AUTHENTICATION.LOGIN,
        payload
      );
      if (response) {
        const token = response.data.data.access_token;
        window.localStorage.setItem("authenticated",JSON.stringify({ isAuthenticated: true, body: { token: token, role: payload.role  }}));
        dispatch({
          type: "login",
          payload: { token: token, role: payload.role }
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    window.localStorage.setItem(
      "authenticated",JSON.stringify(initialState));
      dispatch({
        type: "logout"
      })

  }
  return (
    <RootContext.Provider
      value={{
        ...state,
        handleLogin: payload => {
          login(payload);
        },
        handleLogout: () =>{
          logout()
        },
        isSubmitting
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
const useRootContext = () => useContext(RootContext);
export default (RootContextProvider);
export { RootContext, useRootContext };
