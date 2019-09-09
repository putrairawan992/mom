import React, { useEffect } from "react";
import { useRootContext } from "../../hoc/RootContext";

export default function AppLayout(props) {
    const { isAuthenticated, history } = useRootContext();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        if (props.needAuthenticated && !isAuthenticated) {
            history.push("/login");
        }
    });

    if (props.needAuthenticated && !isAuthenticated) {
        return null;
      } else {
        return (
          <div>{props.children}</div>
        );
    }        
}