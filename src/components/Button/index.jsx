import React from "react";
import { Button as ButtonAnt } from 'antd';
import className from 'classnames/bind';
import propTypes from 'prop-types';
import style from "./style.sass";

const classNameStyle = className.bind(style);

const Button = props => {
    const cssClasses = classNameStyle({
        'mp-btn-primary': (props.type === 'primary'),
        'mp-btn-secondary': (props.type === 'secondary'),
        'mp-btn-width-default': (props.width === 'default'),
        'mp-btn-width-full': (props.width === 'full')
    });

    return (
        <ButtonAnt className={cssClasses} {...props} >{props.children}</ButtonAnt>
    );
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary']),
    width: propTypes.oneOf(['default', 'full'])
}

Button.defaultProps = {
    type: 'primary',
    width: 'default'
}

export default Button;
