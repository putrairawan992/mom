import React from 'react'
import { Input } from 'antd'
import style from './style.sass'
import classNames from 'classnames'
import propTypes from 'prop-types'

const { TextArea } = Input;

const Text = props => {
  const classNamesStyle = classNames.bind(style)
  const cssClasses = classNamesStyle({
    'mp-area-default' : (props.type === 'default'),
    'mp-area-error' : (props.type === 'error')
  })

  return(
    <React.Fragment>
      <TextArea 
        className={cssClasses}
        {...props}
      />
      <p
        style={{
        fontSize: 14,
        lineHeight: 1.5,
        opacity: 0.5,
        float: "right"
        }}
      >
        {props.value ? props.value.length : 0}/{props.maxLength ? props.maxLength : 255}
      </p>
    </React.Fragment>
  )
}

Text.propTypes = {
  type: propTypes.oneOf(['default','error']),
  maxLength: propTypes.number
}

Text.defaultProps = {
  type: 'default'
}

export default Text