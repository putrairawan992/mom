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
        'mp-btn-width-full': (this.props.width === 'full')
    });

    render(){
        return <ButtonAnt className={this.cssClasses} {...this.props} >{this.props.children}</ButtonAnt>
    };
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'secondary', 'white']),
    width: propTypes.oneOf(['default', 'full'])
}

Button.defaultProps = {
    type: 'primary',
    width: 'default'
}

export default Button;
