---
name: Select
menu: Components
---

import {Playground, Props } from 'docz'
import 'antd/dist/antd.css';
import Select from './'
import {Select as SelectAnt} from 'antd'



# Select
This is select option of Monggopesen

## Properties (props)
<Props of={Select} />

## Purpose Of Props
```
options: array of object for select 
```

## Details
no details

## Playground
<Playground>
  {() => {
    const options = [
    { value: "101", name: "Wrong Press" },
    { value: "102", name: "Others" }
    ];
    return (
      <Select
        defaultValue="101"
        options={options}
      >
      </Select>
    )
  }}
</Playground>