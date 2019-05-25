---
name: Button
menu: Components
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import Button from './'

# Button
This is button of Monggopesen

## Properties (props)
<Props of={Button} />

## Purpose
- Type: 'primary' is used for regular button
- Type: 'secondary' is used for first alternative after regular button

## Details
no details

## Button Primary (Default)
<Playground>
    <Button>Click Me</Button>
</Playground>

## Button Secondary
<Playground>
    <Button type="secondary">Click Me</Button>
</Playground>
