import React from "react";
import { Button as ButtonAnt } from 'antd';
import classNames from 'classnames';
import propTypes from 'prop-types';
import style from "./style.sass";

class Button extends React.Component {
    classNamesStyle = classNames.bind(style);
    cssClasses = this.classNamesStyle({
        'mp-btn-primary': (this.props.type === 'primary'),
        'mp-btn-secondary': (this.props.type === 'secondary'),
        'mp-btn-white': (this.props.type === 'white'),
        'mp-btn-danger': (this.props.type === 'danger'),
        'mp-btn-link' : (this.props.type === 'link'),
        'mp-btn-width-full': (this.props.width === 'full'),
        'mp-btn-size-large': (this.props.size === 'large'),
        'mp-btn-size-small': (this.props.size === 'small'),
        'mp-btn-upload' : (this.props.type === 'upload-default'),
        'mp-btn-upload-non-default' : (this.props.type === 'upload-non-default')
    });

    render(){
        return <ButtonAnt className={this.cssClasses} {...this.props} >{this.props.children}</ButtonAnt>
    };
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary','white','link','danger','upload-default','upload-non-default']),
    width: propTypes.oneOf(['default', 'full']),
    size: propTypes.oneOf(['default','large'])
}

Button.defaultProps = {
    type: 'primary',
    width: 'default',
    size: 'default'
}

export default Button;
