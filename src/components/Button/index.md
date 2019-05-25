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
- Width: 'default' is used for default width button
- Width: 'full' is used for full width 100% button

## Playground

### Button Primary (Default)
<Playground>
    <Button>Click Me</Button>
</Playground>

### Button Primary & Width Full
<Playground>
    <Button type="primary" width="full">Click Me</Button>
</Playground>

### Button Secondary
<Playground>
    <Button type="secondary">Click Me</Button>
</Playground>

### Button Secondary & Width Full
<Playground>
    <Button type="secondary" width="full">Click Me</Button>
</Playground>
