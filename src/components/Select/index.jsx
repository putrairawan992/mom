import React from 'react'
import { Select as SelectAnt } from 'antd'
import classNames from 'classnames'
import propTypes from 'prop-types'
import style from './style.sass'

const Option = SelectAnt.Option;

const Select = props => {
  const classNamesStyle = classNames.bind(style)
  const cssClasses = classNamesStyle({
    'mp-select-default' : (props.type === 'default'),
    'mp-option-default' :(props.option === 'default')
  })
  return (
    // <div >
    
      <SelectAnt className={cssClasses} {...props}>
        {props.options.map((option,index) => {
            return (
              <Option className={cssClasses} key={index} value={option.value}>
                {option.name}
              </Option>
            )
        })}
      </SelectAnt>
    // </div>


  )
}

Select.propTypes = {
  type: propTypes.oneOf(['default']),
  options: propTypes.array
}

Select.defaultProps = {
  type: 'default',
  option: "default"
}

export default Select
