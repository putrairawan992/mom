import React from "react";
import { useRootContext } from "../../hoc/RootContext";

export default function FullLayout(props) {  
  const {isAuthenticated, history} = useRootContext();

  if(props.needAuthenticated && !isAuthenticated){
    history.push('/login');
    return null;
  } else {
    return <div>{props.children}</div>;
  }
}