import React from "react";
import { Select as SelectAnt } from "antd";
import classNames from "classnames";
import propTypes from "prop-types";
import style from "./style.sass";

const Option = SelectAnt.Option;

export default function Select(props) {
  const classNamesStyle = classNames.bind(style);
  const cssClasses = classNamesStyle({
    'mp-select-default' : (props.type === 'default'),
    'mp-option-default' :(props.option === 'default'),
    'mp-select-error' : (props.type === 'error')
  })
  return (
    <SelectAnt className={cssClasses} {...props}>
      {props.options.map((option) => {
        return (
          <Option className={cssClasses} key={option.id}  value={option.id} title={option.name}  >
            {option.name}
          </Option>
        );
      })}
    </SelectAnt>
  );
};

Select.propTypes = {
  type: propTypes.oneOf(['default', 'error']),
  options: propTypes.array
};

Select.defaultProps = {
  type: "default",
  option: "default"
};