import React from 'react'
import {Cascader as CascaderAnt } from 'antd'
import propTypes, { object } from 'prop-types'
import classNames from 'classnames'
import style from './style.sass'

const Cascader = props => {
  const classNamesStyle = classNames.bind(style)
  const cssClasses = classNamesStyle({
    'mp-cascader-default' : (props.type === 'default'),
    'mp-cascader-error' :(props.type === 'error')
  })

  return(
      <CascaderAnt
        {...props}
        className={cssClasses}
      >
        {/* <Input
          className={cssClasses}
          value={props.selectedCategory}
          size={props.size}
        /> */}
      </CascaderAnt> 
  )
}

Cascader.propTypes = {
  options: propTypes.arrayOf(object),
  placeholder: propTypes.string,
}

Cascader.defaultProps = {
  type: 'default'
}

export default Cascader