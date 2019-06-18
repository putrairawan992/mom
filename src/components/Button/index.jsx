import React from "react";
import { Button as ButtonAnt } from 'antd';
import classNames from 'classnames';
import propTypes from 'prop-types';
import style from "./style.sass";

const Button = props => {
    const classNamesStyle = classNames.bind(style);
    const cssClasses = classNamesStyle({
        'mp-btn-primary': (props.type === 'primary'),
        'mp-btn-secondary': (props.type === 'secondary'),
        'mp-btn-danger': (props.type === 'danger'),
        'mp-btn-link' : (props.type === 'link'),
        'mp-btn-width-full': (props.width === 'full'),
        'mp-btn-size-large': (props.size === 'large'),
        'mp-btn-size-small': (props.size === 'small'),
    });

    return (
        <ButtonAnt className={cssClasses} {...props} >{props.children}</ButtonAnt>
    );
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary','link','danger']),
    width: propTypes.oneOf(['default', 'full']),
    size: propTypes.oneOf(['small','large'])
}

Button.defaultProps = {
    type: 'primary',
    width: 'default',
}

export default Button;
