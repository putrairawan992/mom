---
name: Cascader
menu: Components
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.less";
import Cascader from './'

# Cascader
This is Cascader for select Category

## Properties (props)
<Props of={Cascader} />

## Purpose Of Props
```
option: array of object for option Cascader
placeholder : placeholder
```

## Details
no details

## Playground

<Playground>
{ () => {
  const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

  return (
    <Cascader options={options} placeholder="Choose your category"  />
  )

}}
</Playground>