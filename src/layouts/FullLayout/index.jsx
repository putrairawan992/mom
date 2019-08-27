import React, {useEffect} from "react";
import { useRootContext } from "../../hoc/RootContext";

export default function FullLayout(props) {  
  const {isAuthenticated, history} = useRootContext();

  useEffect(() => {
    if(props.needAuthenticated && !isAuthenticated) {
      history.push('/login');
    }
  })

  if(props.needAuthenticated && !isAuthenticated){
    return null;
  } else {
    return <div>{props.children}</div>;
  }
}