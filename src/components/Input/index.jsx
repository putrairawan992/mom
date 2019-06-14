import React from 'react'
import { Input as InputAnt } from 'antd'
import classNames from 'classnames'
import style from './style.sass'
import propTypes from 'prop-types'

const Input = props => {
    const classNamesStyle = classNames.bind(style)
    const cssClasses = classNamesStyle({
        'mp-input-default' : (props.status === 'default'),
        'mp-input-error' : (props.status === 'error')
    })

    return (
        <span className={cssClasses}>
            <InputAnt  {...props}/>
        </span>
    )
}

Input.propTypes = {
    status: propTypes.oneOf(['default', 'error'])
}

Input.defaultProps = {
    status : 'default'
}

export default Input