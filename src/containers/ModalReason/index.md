---
name: Modal Reason
menu: Containers
---

import { Playground, Props } from 'docz'
import 'antd/dist/antd.css';
import ModalReason from './';
import {useState} from 'react'
import Button from '../../components/Button'

# Modal Reason
This is modal reason of Monggopesen


## Properties (props)
<Props of={ModalReason} />

## Purpose Of Props
```
options : array of object for select reason
visible : status for open or close modal
onCancel : func to close modal
onSubmit : func to execute data
title : title for title modal
buttonTitle : title for button
```

## Details
no details

## Playground
<Playground>
{ () => {
   const [toggleValue, toggle] = useState(false)
   const actiontoggle = () => {
     toggle(!toggleValue)
   }
   const options = [
    { value: "C01", name: "Out of Stock" },
    { value: "C02", name: "Product Discontinued" },
    { value: "C03", name: "Others" }
  ]
  return (
    <>
    <ModalReason
      visible={toggleValue}
      options={options}
      title={"Cancel Order"}
      buttonTitle={"Cancel Order"}
      onCancel={actiontoggle}
      onSubmit={actiontoggle}
      />
      <Button onClick={actiontoggle} type="primary">Show Modal</Button>
    </>
  )
}}
</Playground>