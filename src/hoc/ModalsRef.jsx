import React from "react";
import propType from 'prop-types';

const ModalsRef = ({ children, value, refValue, status }) => {
  if ((!status || (status && value === refValue))) {
    return <React.Fragment>{children}</React.Fragment>;
  }else{
    return  <React.Fragment/>
  }
};

ModalsRef.propType = {
    value : propType.string,
    refValue: propType.string,
    status: propType.bool
}

export default ModalsRef;
