import React from "react";
import { Tag } from 'antd';
import "./style.sass";

const Colors = props => (
    <Tag className={props.type} style={{padding: "12px 35px"}} >{props.children}</Tag>
)

export default Colors;
