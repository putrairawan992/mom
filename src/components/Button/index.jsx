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