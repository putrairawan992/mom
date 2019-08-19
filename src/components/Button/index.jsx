import React from "react";
import { Button as ButtonAnt } from 'antd';
import classNames from 'classnames';
import propTypes from 'prop-types';
import style from "./style.sass";

export default function Button(props) {
    let classNamesStyle = classNames.bind(style);
    let cssClasses = classNamesStyle({
        'mp-btn-primary': (props.type === 'primary'),
        'mp-btn-secondary': (props.type === 'secondary'),
        'mp-btn-white': (props.type === 'white'),
        'mp-btn-danger': (props.type === 'danger'),
        'mp-btn-link' : (props.type === 'link'),
        'mp-btn-grey' : (props.type === 'grey'),
        'mp-btn-width-full': (props.width === 'full'),
        'mp-btn-size-large': (props.size === 'large'),
        'mp-btn-size-small': (props.size === 'small')
    });

    return <ButtonAnt className={cssClasses} {...props} >{props.children}</ButtonAnt>
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary','white','link','danger','grey']),
    width: propTypes.oneOf(['default', 'full']),
    size: propTypes.oneOf(['default','large'])
}

Button.defaultProps = {
    type: 'primary',
    width: 'default',
    size: 'default'
}
