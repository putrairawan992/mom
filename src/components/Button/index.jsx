import React from "react";
import { Button as ButtonAnt } from 'antd';
import "./style.sass";
import propTypes from 'prop-types';

const Button = props => (
    <ButtonAnt className={props.type} {...props} >{props.children}</ButtonAnt>
);

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary'])
}

Button.defaultProps = {
    type: 'primary'
}

export default Button;
