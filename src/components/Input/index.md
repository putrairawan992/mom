---
name: Input
menu: Components
---

import Input from './'
import {Playground, Props } from 'docz'
import "antd/dist/antd.css";

# Input
This is input of Monggopesen

## Properties (props)
<Props of={Input} />

## Purpose Of Props
- Status: 'default' is used for regular input
- Status: 'error' is used for handling error

### Playground

### Input (Default)
<Playground>
    <Input status="error" />
</Playground>
