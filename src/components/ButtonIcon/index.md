---
name: Button Icon
menu: Components
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.less"
import ButtonIcon from './'

# Button Text With Icon
This is button text with icon of Monggopesen

## Properties (props)
<Props of={ButtonIcon} />

## Purpose Of Props
- Icon is used for set icon --> see antd documentation for more icon type : https://ant.design/components/icon/
- onClick is used for call back event on click

## Details
no details

## Playground

### Button with icon type 'edit'
<Playground>
    <ButtonIcon icon="edit" />
</Playground>
