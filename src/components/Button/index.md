---
name: Button
menu: Components
---

import { Playground, Props } from 'docz'
import Button from './'
import "antd/dist/antd.less"

# Button
This is button of Monggopesen

## Properties (props)
<Props of={Button} />

## Purpose Of Props
- Type: 'primary' is used for regular button
- Type: 'secondary' is used for first alternative after regular button
- Width: 'default' is used for default width button
- Width: 'full' is used for full width 100% button

## Details
no details

## Playground

### Button Primary (Default)
<Playground>
    <Button>Click Me</Button>
</Playground>

### Button Primary & Size Large
<Playground>
    <Button type="primary" size="large">Click Me</Button>
</Playground>

### Button Primary & Width Full
<Playground>
    <Button type="primary" width="full">Click Me</Button>
</Playground>

### Button Secondary
<Playground>
    <Button type="secondary">Click Me</Button>
</Playground>

### Button Danger
<Playground>
    <Button type="danger">Click Me</Button>
</Playground>

### Button Link
<Playground>
    <Button type="link">Click Me</Button>
</Playground>