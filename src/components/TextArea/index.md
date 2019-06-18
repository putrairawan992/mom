---
name: Text Area
menu: Components
---

import { Playground, Props } from 'docz'
import "antd/dist/antd.css";
import TextArea from './'

# Text Area
This is text area of Monggopesen

## Properties
<Props of={TextArea} />

## Purpose Of Props
- Type: 'default' is used for regular text area
- Type: 'error'  is used for error text area

## Details
No Details

## Playground

### Text Area (Default)
<Playground>
  <TextArea type="default"/>
</Playground>

### Text Area (Error)
<Playground>
  <TextArea type="error" />
</Playground>