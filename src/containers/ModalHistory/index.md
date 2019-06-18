---
name: Modal History
menu: Containers
---

import { useState } from 'react';
import { Playground, Props } from 'docz';
import Button from "../../components/Button";
import "antd/dist/antd.css";
import ModalHistory from './';

# Modal History

This is Modal History of Monggopesen

## Properties (props)

<Props of={ModalHistory} />

## Purpose Of Props

- title : Give title to modal
- lists : Data to show history
- visible : The visibility of the modal
- onOk : Show the modal
- onCancel : Close the modal

## Details

```
No detail
```

## Playground

### Modal Logs

<Playground>
{() => {
     const listData = [
            {
            date: 1557893580,
            admin: "Initial D",
            tabStatus: "Need Purchase",
            note: "product is being manufactured by supplier"
            },
            {
            date: 1557461580,
            admin: "Jing Guan",
            tabStatus: "Purchased",
            note:
                "Order was undo-ed to 'Need Response', because Productis out of stock"
            },
            {
            date: 1557375180,
            admin: "Jing Guan",
            tabStatus: "Need Purchase",
            note: "product is being manufactured by supplier"
            }
        ];

     const [visible, setVisible] = useState(false);

     const actionShow = () => {
        setVisible(!visible);
     };

     return (
         <>
            <ModalHistory
            title="Modal Logs"
            lists={listData}
            visible={visible}
            onOk={actionShow}
            />
            <Button onClick={actionShow}>Click Me</Button>
         </>
     )
}}
</Playground>

### Modal Notes