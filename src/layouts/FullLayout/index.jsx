import React, {useEffect} from "react";
import { useRootContext } from "../../hoc/RootContext";

export default function FullLayout(props) {  
  return <div>{props.children}</div>;
}