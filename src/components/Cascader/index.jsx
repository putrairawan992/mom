import React from 'react'
import {Cascader as CascaderAnt } from 'antd'
import propTypes, { object } from 'prop-types'
import './style.sass';

const Cascader = props => {
  return(
    <CascaderAnt
      {...props}
      popupClassName="popup"
      className="input-cascader"
    />
  )
}

Cascader.propTypes = {
  options: propTypes.arrayOf(object),
  placeholder: propTypes.string
}

export default Cascader